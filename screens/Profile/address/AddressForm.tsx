import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
import * as yup from "yup";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { Regex } from "../../../constants/Regex";
import {
	Address,
	AddressResponse,
	editAddressService,
	saveAddressService,
} from "../../../services/addressService";
import { useReduxSelector } from "../../../store";
import { AddressStackParamList } from "../../../types";

type Props = NativeStackScreenProps<AddressStackParamList, "EditAddress">;

const addressValidationSchema = yup.object({
	name: yup.string().required("You need to fill in a name"),
	phoneNumber: yup
		.string()
		.required("You need to fill in a phone number")
		.matches(Regex.phoneRegex, "Please enter a valid phone number"),
	pinCode: yup
		.string()
		.required("Pincode is required")
		.matches(Regex.pinCodeRegex, "Enter a valid pincode"),
	line1: yup.string().required("Address is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
});

const AddressForm = ({ navigation, route }: Props) => {
	const { initialDetails } = route.params;
	useEffect(() => {
		if (initialDetails)
			navigation.setOptions({ headerTitle: "Edit Address" });
	}, []);

	const createAddress = async (address: Address) => {
		try {
			const res = await saveAddressService(address);
			Toast.show("Added new address successfully!");
			navigation.goBack();
		} catch (e) {
			console.log(e);
		}
	};

	const updateAddress = async (address: Address, aid: string) => {
		try {
			const res = await editAddressService(address, aid);
			Toast.show("Saved address successfully!");
			navigation.goBack();
		} catch (e) {
			console.log(e);
		}
	};

	const { id } = useReduxSelector((state) => state.auth.userDetails);

	return (
		<SafeAreaView style={{ flexGrow: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<Formik
					initialValues={{
						name: initialDetails ? initialDetails.name : "",
						phoneNumber: initialDetails
							? initialDetails.phoneNumber.toString()
							: "",
						line1: initialDetails ? initialDetails.line1 : "",
						line2: initialDetails ? initialDetails.line2 : "",
						city: initialDetails ? initialDetails.city : "",
						pinCode: initialDetails ? initialDetails.pinCode : "",
						state: initialDetails ? initialDetails.state : "",
						country: initialDetails ? initialDetails.country : "",
					}}
					validationSchema={addressValidationSchema}
					onSubmit={(values, action) => {
						if (initialDetails) {
							updateAddress(values, initialDetails.aid);
						} else {
							createAddress(values);
						}
					}}
				>
					{(formikProps) => (
						<>
							<View style={styles.content}>
								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Name"
									placeholder="Enter your full name"
									onChangeText={formikProps.handleChange(
										"name"
									)}
									onBlur={formikProps.handleBlur("name")}
									value={formikProps.values.name}
									error={
										!!(
											formikProps.touched.name &&
											formikProps.errors.name
										)
									}
								/>
								<HelperText
									type="error"
									visible={
										!!(
											formikProps.touched.name &&
											formikProps.errors.name
										)
									}
								>
									{formikProps.errors.name}
								</HelperText>
								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Phone"
									keyboardType="phone-pad"
									placeholder="Enter your phone number"
									onChangeText={formikProps.handleChange(
										"phoneNumber"
									)}
									onBlur={formikProps.handleBlur(
										"phoneNumber"
									)}
									value={formikProps.values.phoneNumber}
									error={
										!!(
											formikProps.touched.phoneNumber &&
											formikProps.errors.phoneNumber
										)
									}
								/>
								<HelperText
									type="error"
									visible={
										!!(
											formikProps.touched.phoneNumber &&
											formikProps.errors.phoneNumber
										)
									}
								>
									{formikProps.errors.phoneNumber}
								</HelperText>

								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Address Line 1"
									placeholder="Address Line 1"
									onChangeText={formikProps.handleChange(
										"line1"
									)}
									onBlur={formikProps.handleBlur("line1")}
									value={formikProps.values.line1}
									error={
										!!(
											formikProps.touched.line1 &&
											formikProps.errors.line1
										)
									}
								/>
								<HelperText
									type="error"
									visible={
										!!(
											formikProps.touched.line1 &&
											formikProps.errors.line1
										)
									}
								>
									{formikProps.errors.line1}
								</HelperText>

								<TextInput
									style={styles.textBox}
									mode="outlined"
									label="Address Line 2"
									placeholder="Address Line 2"
									onChangeText={formikProps.handleChange(
										"line2"
									)}
									onBlur={formikProps.handleBlur("line2")}
									value={formikProps.values.line2}
									error={
										!!(
											formikProps.touched.line2 &&
											formikProps.errors.line2
										)
									}
								/>

								<View style={styles.rowContainer}>
									<TextInput
										style={styles.city}
										mode="outlined"
										label="City"
										placeholder="City"
										onChangeText={formikProps.handleChange(
											"city"
										)}
										onBlur={formikProps.handleBlur("city")}
										value={formikProps.values.city}
										error={
											!!(
												formikProps.touched.city &&
												formikProps.errors.city
											)
										}
									/>
									<View style={styles.pincode}>
										<TextInput
											mode="outlined"
											label="Pincode"
											placeholder="Pin Code"
											onChangeText={formikProps.handleChange(
												"pinCode"
											)}
											onBlur={formikProps.handleBlur(
												"pinCode"
											)}
											value={formikProps.values.pinCode}
											error={
												!!(
													formikProps.touched
														.pinCode &&
													formikProps.errors.pinCode
												)
											}
										/>
									</View>
								</View>
								<HelperText
									type="error"
									visible={
										!!(
											(formikProps.touched.city &&
												formikProps.errors.city) ||
											(formikProps.touched.pinCode &&
												formikProps.errors.pinCode)
										)
									}
								>
									{formikProps.errors.city ||
										formikProps.errors.pinCode}
								</HelperText>

								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="State"
									placeholder="State"
									onChangeText={formikProps.handleChange(
										"state"
									)}
									onBlur={formikProps.handleBlur("state")}
									value={formikProps.values.state}
									error={
										!!(
											formikProps.touched.state &&
											formikProps.errors.state
										)
									}
								/>

								<HelperText
									type="error"
									visible={
										!!(
											formikProps.touched.state &&
											formikProps.errors.state
										)
									}
								>
									{formikProps.errors.state}
								</HelperText>
							</View>
							<View style={styles.footer}>
								<Button
									disabled={!formikProps.isValid}
									onPress={formikProps.handleSubmit}
								>
									{initialDetails ? "Update" : "Add"}
								</Button>
							</View>
						</>
					)}
				</Formik>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddressForm;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 15,
	},
	textInput: {
		width: "100%",
	},
	textBox: {
		width: "100%",
		marginBottom: 20,
	},
	rowContainer: {
		flexDirection: "row",
	},
	city: {
		width: "65%",
	},
	pincode: {
		width: "35%",
		paddingLeft: 15,
	},
	button: {
		backgroundColor: Colors.primary,
		color: "white",
		fontSize: 10,
		borderRadius: 25,
		width: "80%",
		marginBottom: 20,
	},
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	footer: {
		width: "100%",
		height: 55,
		borderTopWidth: 1,
		borderTopColor: "#0000001F",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 20,
	},
});
