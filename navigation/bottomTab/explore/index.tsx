import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import UnderConstructionScreen from "../../../screens/UnderConstructionScreen";
import { ExploreStackParamList } from "../../../types";

const Stack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="AllPosts">
			<Stack.Screen
				name="AllPosts"
				options={{ headerTitle: "Explore" }}
				component={UnderConstructionScreen}
			/>
		</Stack.Navigator>
	);
};

export default ExploreStackNavigator;

const styles = StyleSheet.create({});
