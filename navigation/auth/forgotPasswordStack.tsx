import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import CircleStrokeBG from "../../assets/svgs/brushstroke2.svg";
import Logo from "../../assets/svgs/logo.svg";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import ForgotPasswordScreenStep1 from "../../screens/Auth/ForgotPassword/ForgotPasswordScreenStep1";
import ForgotPasswordScreenStep2 from "../../screens/Auth/ForgotPassword/ForgotPasswordScreenStep2";
import UnderConstructionScreen from "../../screens/UnderConstructionScreen";
import { ForgotPasswordStackParamList } from "../../types";

const Stack = createNativeStackNavigator<ForgotPasswordStackParamList>();

const ForgotPasswordStackNavigator = () => {
	const [logoHeight, setLogoHeight] = useState(250);
	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardDidShow", () => {
			setLogoHeight(0);
		});
		const hideListener = Keyboard.addListener("keyboardDidHide", () => {
			setLogoHeight(250);
		});
		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);

	return (
		<>
			<View
				style={{
					height: logoHeight,
					justifyContent: "center",
				}}
			>
				<CircleStrokeBG
					fill={Colors.secondary}
					style={{ position: "absolute" }}
				/>
				<Logo fill={Colors.primary} height={150} />
			</View>
			<Stack.Navigator
				initialRouteName="Step1"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen
					name="Step1"
					initialParams={{ email: "" }}
					component={ForgotPasswordScreenStep1}
				/>
				<Stack.Screen
					name="Step2"
					component={ForgotPasswordScreenStep2}
				/>
			</Stack.Navigator>
		</>
	);
};

export default ForgotPasswordStackNavigator;

const styles = StyleSheet.create({});
