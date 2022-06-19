import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { IconButton } from "react-native-paper";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import UnderConstructionScreen from "../screens/UnderConstructionScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Explore"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="Explore"
				component={UnderConstructionScreen}
				options={({ navigation }: RootTabScreenProps<"Explore">) => ({
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="magnifier" color={color} />
					),
				})}
			/>
			<BottomTab.Screen
				name="Chat"
				component={UnderConstructionScreen}
				options={{
					title: "Chat",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="bubble" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={UnderConstructionScreen}
				options={() => ({
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user" color={color} />
					),
					headerRight: () => (
						<IconButton
							icon={"logout"}
							onPress={() => {
								console.log("Log Out");
							}}
						/>
					),
				})}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof SimpleLineIcons>["name"];
	color: string;
}) {
	return (
		<SimpleLineIcons size={25} style={{ marginBottom: -3 }} {...props} />
	);
}
