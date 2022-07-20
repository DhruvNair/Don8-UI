import {
	ScrollView,
	StyleSheet,
	TextInput as TextInputType,
} from "react-native";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import { ForgotPasswordStackScreenProps } from "../../../types";
import { Button, HelperText, Subheading, TextInput } from "react-native-paper";
import { Formik } from "formik";
import Colors from "../../../constants/Colors";
import { View } from "../../../components/Themed";
import { resetPasswordService } from "../../../services/authService";
import Toast from "react-native-simple-toast";

const SignUpStepTwoSchema = yup.object().shape({
	password: yup
		.string()
		.required("You need to fill in your password")
		.min(8, "Password must be atleast 8 characters"),
	reEnteredPassword: yup.string().when("password", {
		is: (val: string) => (val && val.length > 0 ? true : false),
		then: yup
			.string()
			.required("You need to re-enter your password")
			.min(8, "Password must be atleast 8 characters")
			.oneOf([yup.ref("password")], "Both passwords need to be the same"),
	}),
});

const ForgotPasswordScreenStep2 = ({
	navigation,
	route,
}: ForgotPasswordStackScreenProps<"Step2">) => {
	const [hidePassword, setHidePassword] = useState(true);
	const [hideReEnteredPassword, setHideReEnteredPassword] = useState(true);
	const { email } = route.params;
	const reEnterPasswordRef = useRef<TextInputType>(null);
	const resetPassword = async (credentials: {
		email: string;
		password: string;
	}) => {
		try {
			const res = await resetPasswordService(credentials);
			Toast.show("Password reset successfully! You can login now.");
			navigation.getParent()?.goBack();
		} catch (e: any) {
			Toast.show(e.response.data.body || "An unexpected error occured.");
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<Formik
				validationSchema={SignUpStepTwoSchema}
				initialValues={{ password: "", reEnteredPassword: "" }}
				onSubmit={(values, action) => {
					resetPassword({ email, password: values.password });
				}}
			>
				{(formikProps) => (
					<>
						<ScrollView contentContainerStyle={styles.container}>
							<View style={styles.stepper}>
								<Subheading>
									Step 2 of 2: Reset password
								</Subheading>
							</View>
							<View style={styles.content}>
								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Password"
									secureTextEntry={hidePassword}
									onChangeText={formikProps.handleChange(
										"password"
									)}
									onBlur={formikProps.handleBlur("password")}
									onSubmitEditing={() =>
										reEnterPasswordRef.current?.focus()
									}
									blurOnSubmit={false}
									value={formikProps.values.password}
									error={
										!!(
											formikProps.touched.password &&
											formikProps.errors.password
										)
									}
									right={
										<TextInput.Icon
											name={
												hidePassword
													? "eye-off-outline"
													: "eye-outline"
											}
											onPress={() =>
												setHidePassword(!hidePassword)
											}
										/>
									}
									placeholder="Enter Password"
								/>
								<HelperText
									visible={
										!!(
											formikProps.touched.password &&
											formikProps.errors.password
										)
									}
									type="error"
								>
									{formikProps.errors.password}
								</HelperText>
								<TextInput
									style={styles.textInput}
									mode="outlined"
									label="Re-Enter Password"
									ref={reEnterPasswordRef}
									secureTextEntry={hideReEnteredPassword}
									onChangeText={formikProps.handleChange(
										"reEnteredPassword"
									)}
									onBlur={formikProps.handleBlur(
										"reEnteredPassword"
									)}
									value={formikProps.values.reEnteredPassword}
									returnKeyType="go"
									error={
										!!(
											formikProps.touched
												.reEnteredPassword &&
											formikProps.errors.reEnteredPassword
										)
									}
									right={
										<TextInput.Icon
											name={
												hideReEnteredPassword
													? "eye-off-outline"
													: "eye-outline"
											}
											onPress={() =>
												setHideReEnteredPassword(
													!hideReEnteredPassword
												)
											}
										/>
									}
									placeholder="Re-Enter Password"
								/>
								<HelperText
									visible={
										!!(
											formikProps.touched
												.reEnteredPassword &&
											formikProps.errors.reEnteredPassword
										)
									}
									type="error"
								>
									{formikProps.errors.reEnteredPassword}
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

export default ForgotPasswordScreenStep2;

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
	logo: {
		height: 150,
		width: 150,
	},
});
