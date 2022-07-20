import { Formik } from "formik";
import React, { useRef } from "react";
import {
	Keyboard,
	ScrollView,
	StyleSheet,
	TextInput as TextInputType,
} from "react-native";
import { Button, HelperText, Subheading, TextInput } from "react-native-paper";
import * as yup from "yup";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { Regex } from "../../../constants/Regex";
import { RegisterStackScreenProps } from "../../../types";

const registerStepOneSchema = yup.object({
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

const RegisterScreenStep1 = ({
	navigation,
}: RegisterStackScreenProps<"Step1">) => {
	const emailInputRef = useRef<TextInputType>(null);
	const phoneInputRef = useRef<TextInputType>(null);
	return (
		<View style={{ flex: 1 }}>
			<Formik
				initialValues={{ name: "", email: "", phone: "" }}
				validationSchema={registerStepOneSchema}
				onSubmit={(values, action) => {
					Keyboard.dismiss();
					navigation.navigate("Step2", values);
				}}
			>
				{(formikProps) => (
					<>
						<ScrollView contentContainerStyle={styles.container}>
							<View style={styles.stepper}>
								<Subheading>
									Step 1 of 3: Account details
								</Subheading>
							</View>
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
									onSubmitEditing={() =>
										emailInputRef.current?.focus()
									}
									blurOnSubmit={false}
									returnKeyType="go"
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
									label="Email"
									ref={emailInputRef}
									keyboardType="email-address"
									placeholder="Enter your email ID"
									onChangeText={formikProps.handleChange(
										"email"
									)}
									onBlur={formikProps.handleBlur("email")}
									onSubmitEditing={() =>
										phoneInputRef.current?.focus()
									}
									blurOnSubmit={false}
									value={formikProps.values.email}
									returnKeyType="go"
									error={
										!!(
											formikProps.touched.email &&
											formikProps.errors.email
										)
									}
								/>
								<HelperText
									type="error"
									visible={
										!!(
											formikProps.touched.email &&
											formikProps.errors.email
										)
									}
								>
									{formikProps.errors.email}
								</HelperText>
								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Phone"
									ref={phoneInputRef}
									keyboardType="phone-pad"
									placeholder="Enter your phone number"
									onChangeText={formikProps.handleChange(
										"phone"
									)}
									onBlur={formikProps.handleBlur("phone")}
									onSubmitEditing={() => {}}
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
								disabled={
									!(formikProps.isValid && formikProps.dirty)
								}
								onPress={formikProps.handleSubmit}
							>
								Next
							</Button>
						</View>
					</>
				)}
			</Formik>
		</View>
	);
};

export default RegisterScreenStep1;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	content: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 15,
	},
	stepper: {
		height: 55,
		width: "100%",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.primary,
		justifyContent: "center",
		paddingHorizontal: 15,
		opacity: 0.5,
	},
	textInput: {
		width: "100%",
	},
	footer: {
		width: "100%",
		height: 55,
		borderTopWidth: 1,
		borderTopColor: Colors.primary,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});
