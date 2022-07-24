import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, HelperText, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Toast from "react-native-simple-toast";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { View } from "../../../components/Themed";
import {
	AddressResponse,
	getMyAddressesService,
} from "../../../services/addressService";
import {
	createPostService,
	editPostService,
} from "../../../services/postsService";
import { MyPostsStackScreenProps } from "../../../types";

type Props = MyPostsStackScreenProps<"EditMyPosts">;

const instantProductSchema = yup.object({
	productName: yup.string().required("You need to fill in the product name"),
	price: yup.number().required("You need to fill in the price"),
	// .matches(Regex.price, "Please enter a valid price"),
});

const PostForm = ({ navigation, route }: Props) => {
	const { initialValues } = route.params;
	const [showDropDown, setShowDropDown] = useState(false);
	const [addresses, setAddresses] = useState<AddressResponse[]>([]);
	const dispatch = useDispatch();
	const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
	const [expiryDate, setExpiryDate] = useState(
		initialValues?.dateExpiry
			? new Date(initialValues?.dateExpiry)
			: new Date()
	);
	const [productImage, setProductImage] = useState(
		initialValues?.p_image_url || ""
	);
	const [loading, setLoading] = useState(false);
	const productImageFileRef = useRef<{
		uri: string;
		type: string;
		name: string;
		size?: number;
	}>();

	const getAddressList = async () => {
		try {
			setLoading(true);
			const res = await getMyAddressesService();
			setAddresses(res.data.body.content);
			if (initialValues?.aid) {
				setSelectedAddressIndex(
					res.data.body.content.findIndex(
						(element: AddressResponse) =>
							element.aid === initialValues?.aid
					)
				);
			}
			setLoading(false);
			if (res.data.body.content.length === 0) {
				Toast.show(
					"You currently have no addresses. Add an address before creating a posting!"
				);
				navigation.goBack();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	const onExpiryChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date
	) => {
		if (selectedDate) setExpiryDate(selectedDate);
	};

	const showDatePicker = () => {
		DateTimePickerAndroid.open({
			value: expiryDate,
			onChange: onExpiryChange,
			minimumDate: new Date(),
		});
	};

	const selectProductImage = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "image/*",
				multiple: false,
			});
			if (result.type === "success") {
				setProductImage(result.uri);
				const { name, size, uri } = result;
				const nameParts = name.split(".");
				const fileType = nameParts[nameParts.length - 1];
				productImageFileRef.current = {
					uri,
					type: "image/" + fileType,
					name,
					size,
				};
			} else {
				Toast.show("Could not upload image", Toast.LONG);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const createPost = async (values: {
		productName: string;
		price: string;
		description: string;
	}) => {
		if (productImageFileRef.current) {
			console.log(
				expiryDate.toISOString().split("T")[0].split("-").join("/")
			);
			const res = await createPostService(
				{
					...values,
					aid: addresses[selectedAddressIndex].aid,
					dateAdded: new Date()
						.toISOString()
						.split("T")[0]
						.split("-")
						.join("/"),
					dateExpiry: expiryDate
						.toISOString()
						.split("T")[0]
						.split("-")
						.join("/"),
				},
				productImageFileRef.current
			);
			Toast.show("Posting created successfully!");
			navigation.goBack();
		} else {
			Toast.show("You need to upload an image of the product");
		}
	};

	const editPost = async (values: {
		productName: string;
		price: string;
		description: string;
	}) => {
		if (initialValues) {
			const res = await editPostService(
				initialValues.pid,
				{
					...values,
					aid: addresses[selectedAddressIndex].aid,
					dateAdded: initialValues.dateAdded,
					dateExpiry: expiryDate
						.toISOString()
						.split("T")[0]
						.split("-")
						.join("/"),
				},
				productImageFileRef.current
			);
			Toast.show("Posting editted successfully!");
			navigation.goBack();
		} else {
			Toast.show("Something went wrong");
		}
	};

	useEffect(() => {
		getAddressList();
		if (initialValues)
			navigation.setOptions({ headerTitle: "Edit Posting" });
	}, []);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<Formik
				initialValues={{
					productName: initialValues?.productName || "",
					price: initialValues?.price
						? String(initialValues.price)
						: "",
					description: initialValues?.description || "",
				}}
				validationSchema={instantProductSchema}
				onSubmit={(values, action) => {
					try {
						if (initialValues) {
							editPost(values);
						} else {
							createPost(values);
						}
					} catch (e) {
						console.log(e);
					}
				}}
			>
				{(formikProps) => (
					<>
						<View style={{ alignItems: "center" }}>
							{productImage ? (
								<View
									onStartShouldSetResponderCapture={() => {
										selectProductImage();
										return true;
									}}
									style={styles.imageContainer}
								>
									<Image
										style={styles.image}
										source={{ uri: productImage }}
									/>
								</View>
							) : (
								<View
									onStartShouldSetResponderCapture={() => {
										selectProductImage();
										return true;
									}}
									style={styles.imageContainer}
								>
									<View style={styles.noImage}>
										<MatComIcons
											name="image-plus"
											color={"gray"}
											size={50}
										/>
									</View>
								</View>
							)}
						</View>
						<View
							style={{
								paddingHorizontal: 20,
								paddingBottom: 50,
								flexGrow: 1,
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<TextInput
								style={styles.textInput}
								mode="outlined"
								label="Product name"
								placeholder="Enter the product name"
								onChangeText={formikProps.handleChange(
									"productName"
								)}
								onBlur={formikProps.handleBlur("productName")}
								value={formikProps.values.productName}
								error={
									!!(
										formikProps.touched.productName &&
										formikProps.errors.productName
									)
								}
							/>
							<HelperText
								type="error"
								visible={
									!!(
										formikProps.touched.productName &&
										formikProps.errors.productName
									)
								}
							>
								{formikProps.errors.productName}
							</HelperText>
							<TextInput
								keyboardType="numeric"
								style={styles.textInput}
								mode="outlined"
								label="Price"
								placeholder="Enter the price"
								left={<TextInput.Affix text="$" />}
								onChangeText={formikProps.handleChange("price")}
								onBlur={formikProps.handleBlur("price")}
								value={formikProps.values.price}
								error={
									!!(
										formikProps.touched.price &&
										formikProps.errors.price
									)
								}
							/>
							<HelperText
								type="error"
								visible={
									!!(
										formikProps.touched.price &&
										formikProps.errors.price
									)
								}
							>
								{formikProps.errors.price}
							</HelperText>
							<TextInput
								style={[styles.textInput, { marginBottom: 30 }]}
								mode="outlined"
								multiline
								numberOfLines={4}
								label="Description"
								placeholder="Product Description"
								onChangeText={formikProps.handleChange(
									"description"
								)}
								value={formikProps.values.description}
							/>
							<View style={{ width: "100%" }}>
								<TextInput
									value={expiryDate.toLocaleDateString()}
									onPressIn={showDatePicker}
									style={[
										styles.textInput,
										{ marginBottom: 30 },
									]}
									mode="outlined"
								/>
								<DropDown
									label="Address"
									mode="outlined"
									visible={showDropDown}
									dropDownStyle={{ width: "100%" }}
									showDropDown={() => {
										setShowDropDown(true);
										Keyboard.dismiss();
									}}
									onDismiss={() => setShowDropDown(false)}
									value={selectedAddressIndex}
									setValue={setSelectedAddressIndex}
									list={addresses.map((address, index) => ({
										label:
											address.line1 +
											"," +
											address.city +
											"," +
											address.pinCode,
										value: index,
									}))}
								/>
							</View>

							<Divider style={{ height: 1 }} />
						</View>
						<View style={styles.footer}>
							<Button
								loading={loading}
								onPress={formikProps.handleSubmit}
							>
								finish
							</Button>
						</View>
					</>
				)}
			</Formik>
		</ScrollView>
	);
};

export default PostForm;

const styles = StyleSheet.create({
	close: { marginHorizontal: 10 },
	title: { fontSize: 18 },
	textInput: { width: "100%" },
	footer: {
		width: "100%",
		height: 50,
		borderTopWidth: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	imageContainer: {
		aspectRatio: 1,
		height: 250,
		alignItems: "center",
		justifyContent: "center",
		padding: 25,
	},
	noImage: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(150,150,150,0.2)",
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 25,
	},
});
