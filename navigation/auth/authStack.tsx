import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "../../screens/Auth/Login/LoginScreen";
import UnderConstructionScreen from "../../screens/UnderConstructionScreen";
import { AuthStackParamList } from "../../types";
import RegisterStackNavigator from "./registerStack";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterStackNavigator} />
			<Stack.Screen
				name="Forgot Password"
				component={UnderConstructionScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
