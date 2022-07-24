import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import PostListItem from "../../components/PostListItem";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { getAllPostsService, PostResponse } from "../../services/postsService";
import { useReduxSelector } from "../../store";
import { ExploreStackScreenProps } from "../../types";

type Props = ExploreStackScreenProps<"AllPosts"> & {
	searchText: string;
};

const PostList = ({ navigation, searchText }: Props) => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState<PostResponse[]>([]);
	const { id } = useReduxSelector((state) => state.auth.userDetails);
	const getAllPosts = async () => {
		try {
			setLoading(true);
			const res = await getAllPostsService();
			setAllPosts(
				res.data.content.filter(
					(element: PostResponse) =>
						element.uid != id && !element.is_donated
				)
			);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getAllPosts();
		}, [])
	);

	if (loading) {
		return (
			<View style={[styles.flexCenter, styles.fullHW]}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={[styles.fullHW]}>
			<FlatList
				ListEmptyComponent={() => (
					<View style={[styles.flexCenter, styles.fullHW]}>
						<Text>No posts available to display!</Text>
					</View>
				)}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				data={allPosts.filter(
					(post) =>
						post.productName
							.toLowerCase()
							.includes(searchText.toLowerCase()) || !searchText
				)}
				renderItem={({ item }: { item: PostResponse }) => (
					<PostListItem
						post={item}
						onPress={() => {
							navigation.navigate("PostDetails", { post: item });
						}}
					/>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default PostList;

const styles = StyleSheet.create({
	flexCenter: {
		justifyContent: "center",
		alignItems: "center",
	},
	fullHW: {
		width: "100%",
		height: "100%",
	},
});
