import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import useColorScheme from "../../../hooks/useColorScheme";
import PostDetails from "../../../screens/Explore/PostDetails";
import PostList from "../../../screens/Explore/PostList";
import { ExploreStackParamList } from "../../../types";

const Stack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackNavigator = () => {
	const [searchText, setSearchText] = useState("");
	const theme = useColorScheme();

	return (
		<Stack.Navigator initialRouteName="AllPosts">
			<Stack.Screen
				name="AllPosts"
				options={{
					headerTitle: "Explore",
					headerSearchBarOptions: {
						inputType: "text",
						placeholder: "Search for a product",
						onChangeText: (e) => setSearchText(e.nativeEvent.text),
						textColor: theme === "dark" ? "white" : "black",
						headerIconColor: theme === "dark" ? "white" : "black",
						shouldShowHintSearchIcon: false,
					},
				}}
			>
				{(props) => <PostList {...props} searchText={searchText} />}
			</Stack.Screen>
			<Stack.Screen
				options={{ headerTitle: "Post Details" }}
				name="PostDetails"
				component={PostDetails}
			/>
		</Stack.Navigator>
	);
};

export default ExploreStackNavigator;

const styles = StyleSheet.create({});
