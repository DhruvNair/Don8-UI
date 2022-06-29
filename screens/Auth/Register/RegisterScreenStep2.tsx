import {
	ScrollView,
	StyleSheet,
	TextInput as TextInputType,
} from "react-native";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import { RegisterStackScreenProps } from "../../../types";
import { Button, HelperText, Subheading, TextInput } from "react-native-paper";
import { Formik } from "formik";
import Colors from "../../../constants/Colors";
import { View } from "../../../components/Themed";

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

const RegisterScreenStep2 = ({
	navigation,
	route,
}: RegisterStackScreenProps<"Step2">) => {
	const [hidePassword, setHidePassword] = useState(true);
	const [hideReEnteredPassword, setHideReEnteredPassword] = useState(true);
	const [checkedTnC, setCheckedTnC] = useState(false);
	const [checkedNewsLetters, setCheckedNewsLetters] = useState(false);
	const { email, name, phone } = route.params;
	const reEnterPasswordRef = useRef<TextInputType>(null);
	return (
		<View style={{ flex: 1 }}>
			<Formik
				validationSchema={SignUpStepTwoSchema}
				initialValues={{ password: "", reEnteredPassword: "" }}
				onSubmit={(values, action) => {
					navigation.navigate("Step3", {
						name,
						email,
						phone,
						password: values.password,
					});
				}}
			>
				{(formikProps) => (
					<>
						<ScrollView contentContainerStyle={styles.container}>
							<View style={styles.stepper}>
								<Subheading>
									Step 2 of 3: Account setup
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

export default RegisterScreenStep2;

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
