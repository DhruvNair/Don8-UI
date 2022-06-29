import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import CircleStrokeBG from "../../assets/svgs/brushstroke2.svg";
import Logo from "../../assets/svgs/logo.svg";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import RegisterScreenStep1 from "../../screens/Auth/Register/RegisterScreenStep1";
import RegisterScreenStep2 from "../../screens/Auth/Register/RegisterScreenStep2";
import RegisterScreenStep3 from "../../screens/Auth/Register/RegisterScreenStep3";
import { RegisterStackParamList } from "../../types";

const Stack = createNativeStackNavigator<RegisterStackParamList>();

const RegisterStackNavigator = () => {
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
				<Stack.Screen name="Step1" component={RegisterScreenStep1} />
				<Stack.Screen name="Step2" component={RegisterScreenStep2} />
				<Stack.Screen name="Step3" component={RegisterScreenStep3} />
			</Stack.Navigator>
		</>
	);
};

export default RegisterStackNavigator;

const styles = StyleSheet.create({});
