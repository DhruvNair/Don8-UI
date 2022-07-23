import React from "react";
import { StyleSheet, Image } from "react-native";
import { IconButton, List } from "react-native-paper";
import Colors from "../constants/Colors";
import { Post } from "../services/postsService";
import { Text, View } from "./Themed";

type Props = {
	post: Post;
	own_post?: boolean;
	is_donated?: boolean;
	onPress?: () => void;
	onDelete?: () => void;
	onEdit?: () => void;
	onUpdateDonation?: () => void;
};
const PostListItem = ({
	post,
	own_post = false,
	is_donated = false,
	onPress,
	onDelete,
	onEdit,
	onUpdateDonation,
}: Props) => {
	return (
		<List.Item
			style={{ width: "100%" }}
			title={post.productName}
			description={post.description}
			onPress={onPress}
			left={() => (
				<Image
					style={{
						height: 50,
						aspectRatio: 1,
					}}
					source={{ uri: post.p_image_url }}
				/>
			)}
			right={() => {
				if (own_post)
					return (
						<View style={styles.rightIcons}>
							<IconButton
								icon={is_donated ? "check-circle" : "check"}
								color={is_donated ? "red" : Colors.primary}
								onPress={onUpdateDonation}
							/>
							{!is_donated && (
								<IconButton icon="pencil" onPress={onEdit} />
							)}
							<IconButton
								icon="delete-outline"
								color="red"
								onPress={onDelete}
							/>
						</View>
					);
				else return <></>;
			}}
		/>
	);
};

export default PostListItem;

const styles = StyleSheet.create({
	rightIcons: { flexDirection: "row" },
});