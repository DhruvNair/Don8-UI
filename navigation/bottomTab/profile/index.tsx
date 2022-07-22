import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import UnderConstructionScreen from "../../../screens/UnderConstructionScreen";
import { useReduxDispatch } from "../../../store";
import { clearToken } from "../../../store/auth/token";
import { IconButton } from "react-native-paper";
import { ProfileStackParamList } from "../../../types";
import ProfileOverviewScreen from "../../../screens/Profile/ProfileOverview";
import EditProfile from "../../../screens/Profile/EditProfile";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
	const dispatch = useReduxDispatch();
	return (
		<Stack.Navigator initialRouteName="ProfileOverview">
			<Stack.Screen
				name="ProfileOverview"
				options={({ navigation }) => ({
					headerTitle: "Profile",
					headerRight: () => (
						<View style={styles.iconContainer}>
							<IconButton
								icon={"pencil"}
								onPress={() => {
									navigation.navigate("EditProfile");
								}}
							/>
							<IconButton
								icon={"logout"}
								onPress={() => {
									dispatch(clearToken());
								}}
							/>
						</View>
					),
				})}
				component={ProfileOverviewScreen}
			/>
			<Stack.Screen
				name="EditProfile"
				options={{ headerTitle: "Edit Profile" }}
				component={EditProfile}
			/>
			<Stack.Screen
				options={{ headerTitle: "My Posts" }}
				name="MyPosts"
				component={UnderConstructionScreen}
			/>
			<Stack.Screen
				options={{ headerTitle: "My Addresses" }}
				name="MyAddresses"
				component={UnderConstructionScreen}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({
	iconContainer: { flexDirection: "row" },
});
