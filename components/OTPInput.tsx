import {
	Keyboard,
	Pressable,
	StyleSheet,
	TextInput as TextInputType,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-paper";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";

type Props = {
	code: string;
	setCode: (code: string) => void;
	setPinReady: (pinReady: boolean) => void;
	maxLength: number;
};

const OTPInput = ({ code, setCode, setPinReady, maxLength }: Props) => {
	const textInputRef = useRef<TextInputType>(null);
	const totalDigitsArray = new Array(maxLength).fill(0);
	const [inputContainerIsFocused, setInputContainerIsFocused] =
		useState(false);

	useEffect(() => {
		setPinReady(
			code.length === maxLength &&
				Number.isInteger(Number(code)) &&
				!code.includes(".")
		);
		return () => {
			setPinReady(false);
		};
	}, [code]);
	useEffect(() => {
		const hideListener = Keyboard.addListener("keyboardDidHide", () => {
			setInputContainerIsFocused(false);
		});

		return () => {
			hideListener.remove();
		};
	}, []);

	const handleOnPress = () => {
		setInputContainerIsFocused(true);
		textInputRef.current?.focus();
	};

	const handleOnBlur = () => {
		setInputContainerIsFocused(false);
		textInputRef.current?.blur();
	};

	const toCodeDigitInput = (_value: string, index: number) => {
		const emptyInputChar = " ";
		const digit = code[index] || emptyInputChar;

		const isCurrentDigit = index === code.length;
		const isLastDigit = index === maxLength - 1;
		const isCodeFull = code.length === maxLength;

		const isDigitFocused =
			(inputContainerIsFocused && isCurrentDigit) ||
			(isLastDigit && isCodeFull);

		return (
			<View
				key={index}
				style={[
					styles.OTPDigitContainer,
					isDigitFocused ? styles.focusedDigitContainer : {},
				]}
			>
				<Text style={styles.OTPDigitText}>{digit}</Text>
			</View>
		);
	};

	return (
		<View style={{ width: "90%" }}>
			<Pressable onPress={handleOnPress} style={styles.OTPContainer}>
				{totalDigitsArray.map(toCodeDigitInput)}
			</Pressable>
			<TextInput
				mode="outlined"
				value={code}
				maxLength={maxLength}
				onChangeText={setCode}
				keyboardType="number-pad"
				returnKeyType="done"
				textContentType="oneTimeCode"
				style={styles.hiddenTextInput}
				ref={textInputRef}
				onBlur={handleOnBlur}
			/>
		</View>
	);
};

export default OTPInput;

const styles = StyleSheet.create({
	hiddenTextInput: {
		width: 1,
		position: "absolute",
		height: 1,
		opacity: 0,
	},
	OTPContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	OTPDigitContainer: {
		borderColor: Colors.primary,
		borderWidth: 2,
		borderRadius: 5,
		padding: 12,
		minWidth: "15%",
	},
	focusedDigitContainer: {
		backgroundColor: `${Colors.primary}80`,
	},
	OTPDigitText: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
	},
});
