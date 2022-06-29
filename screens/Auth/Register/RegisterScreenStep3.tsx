import { Keyboard, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RegisterStackScreenProps } from "../../../types";
import OTPInput from "../../../components/OTPInput";
import { View, Text } from "../../../components/Themed";
import { Button, Subheading } from "react-native-paper";
import Colors from "../../../constants/Colors";

const RegisterScreenStep3 = ({
	navigation,
	route,
}: RegisterStackScreenProps<"Step3">) => {
	const [code, setCode] = useState("");
	const [pinReady, setPinReady] = useState(false);
	const MAX_CODE_LENGTH = 4;
	return (
		<Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
			<View style={{ flex: 1, alignItems: "center" }}>
				<View style={styles.stepper}>
					<Subheading>Step 3 of 3: Account verification</Subheading>
				</View>
				<View style={styles.sentContainer}>
					<Text style={styles.sentText}>
						You'll receive a {MAX_CODE_LENGTH} digit code at
						{" " + route.params.email}. Please enter this code to
						verify your account.
					</Text>
				</View>
				<OTPInput
					code={code}
					setCode={setCode}
					setPinReady={setPinReady}
					maxLength={MAX_CODE_LENGTH}
				/>
				<View style={styles.buttonContainer}>
					<Button
						disabled={!pinReady}
						mode="contained"
						style={styles.button}
					>
						Submit
					</Button>
				</View>
			</View>
		</Pressable>
	);
};

export default RegisterScreenStep3;

const styles = StyleSheet.create({
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
	sentContainer: {
		padding: 25,
	},
	buttonContainer: {
		padding: 50,
		flexDirection: "row",
	},
	button: {
		width: "100%",
		flex: 1,
	},
	sentText: {
		paddingHorizontal: 10,
	},
});
