import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "../screens/Auth/Login/LoginScreen";
import { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
		</Stack.Navigator>
	);
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
