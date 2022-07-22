import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
	Keyboard,
	ScrollView,
	StyleSheet,
	TextInput as TextInputType,
} from "react-native";
import {
	Button,
	Caption,
	HelperText,
	Subheading,
	TextInput,
} from "react-native-paper";
import Toast from "react-native-simple-toast";
import Colors from "../../../constants/Colors";
import { forgotPasswordOTPService } from "../../../services/authService";
import { ForgotPasswordStackScreenProps } from "../../../types";
import { View, Text } from "../../../components/Themed";
import OTPInput from "../../../components/OTPInput";

const ForgotPasswordScreenStep1 = ({
	navigation,
	route,
}: ForgotPasswordStackScreenProps<"Step1">) => {
	const [username, setUsername] = useState(route.params.email);
	const [validUsername, setValidUsername] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState("");
	const otp = useRef(null);
	const [pinReady, setPinReady] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const MAX_CODE_LENGTH = 4;

	const checkOTP = () => {
		setLoading(true);
		setTimeout(() => {
			if (code === otp.current) {
				navigation.navigate("Step2", { email: username });
			} else {
				Toast.show(
					"The OTP that you entered is incorrect. Please try again."
				);
				setCode("");
				setLoading(false);
			}
		}, 2000);
	};

	const validateUsername = async () => {
		setUsernameError("");
		try {
			if (username) {
				setLoading(true);
				const res = (await forgotPasswordOTPService(username)).data;
				setValidUsername(true);
				setOtpSent(true);
				otp.current = res.body;
				console.log(otp.current);
			} else {
				setUsernameError("Please enter an email");
			}
		} catch (e: any) {
			setUsernameError(e.response.data.body);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.stepper}>
						<Subheading>
							Step 1 of 2: Account verification
						</Subheading>
					</View>
					<View style={styles.content}>
						<TextInput
							style={styles.textInput}
							mode="outlined"
							label="Email"
							placeholder="Enter email"
							onChangeText={setUsername}
							keyboardType="email-address"
							autoCapitalize="none"
							disabled={validUsername}
							onSubmitEditing={validateUsername}
							value={username}
							error={!!usernameError}
						/>
						<HelperText type="error" visible={!!usernameError}>
							{usernameError}
						</HelperText>
						{validUsername ? (
							<>
								<View style={styles.sentContainer}>
									<Text
										style={[
											styles.sentText,
											{ opacity: otpSent ? 1 : 0 },
										]}
									>
										You'll receive a {MAX_CODE_LENGTH} digit
										code at
										{" " + username}. Please enter this code
										to verify your account.
									</Text>
								</View>
								<OTPInput
									code={code}
									setCode={setCode}
									setPinReady={setPinReady}
									maxLength={MAX_CODE_LENGTH}
								/>
								<Caption
									onPress={validateUsername}
									style={styles.caption}
								>
									Resend OTP
								</Caption>
							</>
						) : (
							<Caption
								onPress={validateUsername}
								style={styles.caption}
							>
								Generate OTP
							</Caption>
						)}
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Button disabled={!pinReady} onPress={checkOTP}>
						Next
					</Button>
				</View>
			</>
		</View>
	);
};

export default ForgotPasswordScreenStep1;

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
	caption: {
		textDecorationLine: "underline",
		color: Colors.primary,
		marginVertical: 10,
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
	sentContainer: {
		padding: 25,
	},
	sentText: {
		paddingHorizontal: 10,
	},
});
