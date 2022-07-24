import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import MyPostsList from "../../../../screens/Profile/myposts/MyPostsList";
import PostForm from "../../../../screens/Profile/myposts/PostForm";
import UnderConstructionScreen from "../../../../screens/UnderConstructionScreen";
import { useReduxDispatch } from "../../../../store";
import { setTabBarVisible } from "../../../../store/app/tabBar";
import { MyPostsStackParamList } from "../../../../types";

const Stack = createNativeStackNavigator<MyPostsStackParamList>();

const MyPostsStackNavigator = () => {
	const dispatch = useReduxDispatch();
	useEffect(() => {
		dispatch(setTabBarVisible(false));

		return () => {
			dispatch(setTabBarVisible(true));
		};
	}, []);

	return (
		<Stack.Navigator initialRouteName="MyPostsList">
			<Stack.Screen
				name="MyPostsList"
				options={({ navigation }) => ({
					headerTitle: "My Posts",
					headerRight: () => {
						return (
							<IconButton
								icon="plus"
								onPress={() => {
									navigation.navigate("EditMyPosts", {});
								}}
							/>
						);
					},
				})}
				component={MyPostsList}
			/>
			<Stack.Screen
				options={{ headerTitle: "Create Posting" }}
				name="EditMyPosts"
				component={PostForm}
			/>
		</Stack.Navigator>
	);
};

export default MyPostsStackNavigator;

const styles = StyleSheet.create({});
