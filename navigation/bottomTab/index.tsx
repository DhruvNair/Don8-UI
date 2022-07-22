import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useEffect } from "react";
import Colors from "../../constants/Colors";
import { updateLocalUserDetails } from "../../helpers/userDetailsHelpers";
import useColorScheme from "../../hooks/useColorScheme";
import UnderConstructionScreen from "../../screens/UnderConstructionScreen";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { RootTabParamList, RootTabScreenProps } from "../../types";
import ExploreStackNavigator from "./explore";
import ProfileStackNavigator from "./profile";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
	const colorScheme = useColorScheme();
	const { tabBarVisible } = useReduxSelector((state) => state.app);
	useEffect(() => {
		updateLocalUserDetails();
	}, []);
	const dispatch = useReduxDispatch();

	return (
		<BottomTab.Navigator
			initialRouteName="Explore"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				headerShown: false,
				tabBarStyle: tabBarVisible ? {} : { display: "none" },
			}}
		>
			<BottomTab.Screen
				name="Explore"
				component={ExploreStackNavigator}
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
					headerShown: true,
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={ProfileStackNavigator}
				options={() => ({
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user" color={color} />
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
