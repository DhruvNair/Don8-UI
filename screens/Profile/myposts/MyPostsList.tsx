import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Toast from "react-native-simple-toast";
import PostListItem from "../../../components/PostListItem";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import {
	changeDonationStatusService,
	deletePostService,
	getMyPostsService,
	PostResponse,
} from "../../../services/postsService";
import { MyPostsStackScreenProps } from "../../../types";

type Props = MyPostsStackScreenProps<"MyPostsList">;

const MyPostsList = ({ navigation }: Props) => {
	const [loading, setLoading] = useState(false);
	const [myPosts, setMyPosts] = useState<PostResponse[]>([]);
	const getMyPosts = async () => {
		try {
			setLoading(true);
			const res = await getMyPostsService();
			setMyPosts(res.data.content);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const deletePost = async (pid: string) => {
		try {
			const res = await deletePostService(pid);
			getMyPosts();
			Toast.show("Deleted Post successfully");
		} catch (e) {
			console.log(e);
		}
	};

	const updateDonation = async (post: PostResponse) => {
		try {
			const res = await changeDonationStatusService(
				post.pid,
				post,
				!post.is_donated
			);
			Toast.show(
				"Changed status of post to " +
					(post.is_donated ? "incomplete" : "complete")
			);
			getMyPosts();
		} catch (e) {
			console.log(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyPosts();
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
						<Text>You've got no posts to display!</Text>
					</View>
				)}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				data={myPosts}
				renderItem={({ item }: { item: PostResponse }) => (
					<PostListItem
						post={item}
						onEdit={() =>
							navigation.navigate("EditMyPosts", {
								initialValues: item,
							})
						}
						is_donated={item.is_donated}
						onDelete={() => {
							deletePost(item.pid);
						}}
						onPress={() => {}}
						onUpdateDonation={() => updateDonation(item)}
						own_post
					/>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default MyPostsList;

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
