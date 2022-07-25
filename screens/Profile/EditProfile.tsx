import * as DocumentPicker from "expo-document-picker";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Button, HelperText, TextInput } from "react-native-paper";
import Toast from "react-native-simple-toast";
import * as yup from "yup";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { Regex } from "../../constants/Regex";
import { updateLocalUserDetails } from "../../helpers/userDetailsHelpers";
import {
	updateUserDetailsService,
	UploadableFile,
} from "../../services/authService";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { setTabBarVisible } from "../../store/app/tabBar";
import { ProfileStackScreenProps } from "../../types";

type Props = ProfileStackScreenProps<"EditProfile">;

const editProfileSchema = yup.object({
	name: yup.string().required("You need to fill in your name"),
	email: yup
		.string()
		.required("You need to fill in your email id")
		.matches(Regex.emailRegex, "Please enter a valid email id"),
	phone: yup
		.string()
		.required("You need to fill in your phone number")
		.matches(Regex.phoneRegex, "Please enter a valid phone number"),
});

const EditProfile = ({ navigation }: Props) => {
	const { id, displayName, email, mobile, profileImageURL } =
		useReduxSelector((state) => state.auth.userDetails);
	const dispatch = useReduxDispatch();
	useEffect(() => {
		dispatch(setTabBarVisible(false));
		return () => {
			dispatch(setTabBarVisible(true));
		};
	}, []);

	const [loading, setLoading] = useState(false);
	const [profilePic, setProfilePic] = useState(profileImageURL);
	const profilePicFileRef = useRef<UploadableFile>();
	const selectProfilePicture = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "image/*",
				multiple: false,
			});
			if (result.type === "success") {
				setProfilePic(result.uri);
				const { name, size, uri } = result;
				const nameParts = name.split(".");
				const fileType = nameParts[nameParts.length - 1];
				profilePicFileRef.current = {
					uri,
					type: "image/" + fileType,
					name,
					size,
				};
			} else {
				Toast.show("Cannot upload image", Toast.LONG);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Formik
			initialValues={{
				name: displayName,
				email: email,
				phone: mobile,
			}}
			validationSchema={editProfileSchema}
			onSubmit={async (values, action) => {
				try {
					setLoading(true);
					await updateUserDetailsService(
						values,
						profilePicFileRef.current
					);
					await updateLocalUserDetails();
					navigation.goBack();
				} catch (e) {
					setLoading(false);
					console.log(e);
				}
			}}
		>
			{(formikProps) => (
				<>
					<ScrollView contentContainerStyle={styles.formContainer}>
						<View style={styles.content}>
							<View
								onStartShouldSetResponderCapture={() => {
									selectProfilePicture();
									return true;
								}}
								style={styles.profileImage}
							>
								<>
									{!!profilePic ? (
										<Avatar.Image
											size={126}
											source={{
												uri:
													profilePic +
													+"?" +
													new Date(),
											}}
										/>
									) : (
										<Avatar.Text
											size={126}
											label={displayName[0].toUpperCase()}
										/>
									)}
									<Text style={styles.profileImageText}>
										Change
									</Text>
								</>
							</View>
							<TextInput
								style={styles.textInput}
								mode="outlined"
								label="Name"
								placeholder="Enter your full name"
								onChangeText={formikProps.handleChange("name")}
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
								style={[styles.textInput, { marginBottom: 25 }]}
								mode="outlined"
								label="Email"
								disabled
								keyboardType="email-address"
								value={email}
							/>
							<TextInput
								style={[styles.textInput]}
								mode="outlined"
								label="Phone"
								keyboardType="phone-pad"
								onChangeText={formikProps.handleChange("phone")}
								onBlur={formikProps.handleBlur("phone")}
								value={formikProps.values.phone}
								error={
									!!(
										formikProps.touched.phone &&
										formikProps.errors.phone
									)
								}
							/>
							<HelperText
								type="error"
								visible={
									!!(
										formikProps.touched.phone &&
										formikProps.errors.phone
									)
								}
							>
								{formikProps.errors.phone}
							</HelperText>
						</View>
					</ScrollView>
					<View style={styles.footer}>
						<Button
							loading={loading}
							onPress={formikProps.handleSubmit}
							color={Colors.primary}
						>
							Update
						</Button>
					</View>
				</>
			)}
		</Formik>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	headerTitle: { fontSize: 20, letterSpacing: 0.5 },
	formContainer: {
		flexGrow: 1,
		backgroundColor: "white",
		alignItems: "center",
	},
	content: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingVertical: 10,
	},
	textInput: {
		width: "100%",
	},
	footer: {
		width: "100%",
		height: 50,
		borderTopWidth: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	genderContainer: {
		width: "100%",
		paddingVertical: 10,
	},
	chipContainer: {
		flexDirection: "row",
		marginTop: 5,
	},
	chip: {
		marginHorizontal: 5,
	},
	profileImage: {
		width: 126,
		borderRadius: 63,
		overflow: "hidden",
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	profileImageText: {
		position: "absolute",
		width: "100%",
		height: 24,
		bottom: 0,
		textAlign: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		color: "white",
	},
});
