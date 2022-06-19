import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Button, Caption, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { Regex } from "../../../constants/Regex";
import { useReduxDispatch } from "../../../store";
import BGStroke from "../../../assets/svgs/brushstroke1.svg";
import Logo from "../../../assets/svgs/logo.svg";

const loginSchema = yup.object({
	email: yup
		.string()
		.required("You need to fill in your email")
		.matches(Regex.emailRegex, "Please enter a valid email"),
	password: yup
		.string()
		.required("You need to fill in your password")
		.min(8, "Passwords can't be less than 8 characters"),
});

const LoginScreen = () => {
	const [passwordHidden, setPasswordHidden] = useState(true);
	const dispatch = useReduxDispatch();
	const passwordInputRef = useRef(null);

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={[StyleSheet.absoluteFill, styles.container]}
		>
			<BGStroke
				style={{
					position: "absolute",
				}}
				width={Dimensions.get("window").width}
				height={Dimensions.get("window").height}
			/>
			<View
				onStartShouldSetResponder={() => {
					Keyboard.dismiss();
					return false;
				}}
				style={styles.content}
			>
				<Logo fill={Colors.primary} style={styles.logo} />
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={loginSchema}
					onSubmit={(values, action) => {
						// dispatch(logInUser(values));
					}}
				>
					{(formikProps) => (
						<>
							<TextInput
								style={styles.textInput}
								mode="outlined"
								label="Email"
								placeholder="Email"
								onChangeText={formikProps.handleChange("email")}
								onBlur={formikProps.handleBlur("email")}
								value={formikProps.values.email}
								// onSubmitEditing={() =>
								// 	passwordInputRef.current?.focus()
								// }
								blurOnSubmit={false}
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
								ref={passwordInputRef}
								label="Password"
								onChangeText={formikProps.handleChange(
									"password"
								)}
								onBlur={formikProps.handleBlur("password")}
								value={formikProps.values.password}
								secureTextEntry={passwordHidden}
								// onSubmitEditing={formikProps.handleSubmit}
								blurOnSubmit={false}
								right={
									<TextInput.Icon
										name={
											passwordHidden
												? "eye-off-outline"
												: "eye-outline"
										}
										onPress={() =>
											setPasswordHidden(!passwordHidden)
										}
									/>
								}
								error={
									!!(
										formikProps.touched.password &&
										formikProps.errors.password
									)
								}
								placeholder="Enter Password"
							/>
							<HelperText
								type="error"
								visible={
									!!(
										formikProps.touched.password &&
										formikProps.errors.password
									)
								}
							>
								{formikProps.errors.password}
							</HelperText>
							<Button
								mode="contained"
								style={styles.button}
								onPress={formikProps.handleSubmit}
								labelStyle={{ color: "white" }}
							>
								Sign In
							</Button>

							<Caption
								style={styles.caption}
								onPress={() => {
									Keyboard.dismiss();
									// navigation.navigate('Forgot Password', {
									//     email: formikProps.values.email,
									// });
								}}
							>
								Forgot Password?
							</Caption>
							<Caption
								// onPress={openSignUpScreen}
								style={styles.caption}
							>
								New here? Create a new account!
							</Caption>
						</>
					)}
				</Formik>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
	},
	content: {
		alignItems: "center",
		paddingHorizontal: 50,
		paddingTop: 15,
		width: "100%",
		backgroundColor: "transparent",
	},
	logo: {
		height: 150,
		width: 150,
		marginBottom: 50,
	},
	textInput: {
		width: "100%",
	},
	button: {
		width: "100%",
		marginVertical: 15,
	},
	caption: {
		textDecorationLine: "underline",
		marginVertical: 10,
		color: Colors.primary,
	},
});
