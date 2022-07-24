import { StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { View, Text } from "../../components/Themed";
import { ExploreStackScreenProps } from "../../types";
import { Avatar } from "react-native-paper";
import { useReduxDispatch } from "../../store";
import { setTabBarVisible } from "../../store/app/tabBar";
import Colors from "../../constants/Colors";

type Props = ExploreStackScreenProps<"PostDetails">;

const PostDetails = ({ navigation, route }: Props) => {
	const { post } = route.params;
	const dispatch = useReduxDispatch();
	useEffect(() => {
		navigation.setOptions({
			headerTitle: post.productName + " by " + post.user.name,
		});
		dispatch(setTabBarVisible(false));
		return () => {
			dispatch(setTabBarVisible(true));
		};
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: post.p_image_url + "?" + new Date() }}
				/>
			</View>
			<View style={styles.addressContainer}>
				<Text style={styles.specialColor}>{post.productName}</Text>
				<Text> available at </Text>
				<Text style={styles.specialColor}>
					{post.address.line1 +
						", " +
						(post.address.line2 ? post.address.line2 + ", " : "") +
						post.address.city +
						", " +
						post.address.state +
						", " +
						post.address.pinCode}
				</Text>
			</View>
			<View style={{ width: "100%" }}>
				<Text>
					Expires by:{" "}
					<Text style={styles.specialColor}>
						{new Date(post.dateExpiry).toLocaleDateString()}
					</Text>
				</Text>
				{!!post.description && (
					<Text>
						Description:{" "}
						<Text style={styles.specialColor}>
							{post.description}
						</Text>
					</Text>
				)}
				<Text>
					Price:{" "}
					<Text style={styles.specialColor}>${post.price}</Text>
				</Text>
				<Text>
					Contact:{" "}
					<Text style={styles.specialColor}>{post.address.name}</Text>{" "}
					at{" "}
					<Text style={styles.specialColor}>
						{post.address.phoneNumber}
					</Text>
				</Text>
			</View>
			<View style={styles.bubbleContainer}>
				<View style={styles.uploaderContainer}>
					{!!post.user.image_url ? (
						<Avatar.Image
							style={styles.avatar}
							size={50}
							source={{
								uri: post.user.image_url + "?" + new Date(),
							}}
						/>
					) : (
						<Avatar.Text
							style={styles.avatar}
							size={50}
							label={(post.user.name[0] || "").toUpperCase()}
						/>
					)}
					<Text>Uploaded by </Text>
					<Text
						style={[styles.specialColor, { maxWidth: 100 }]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{post.user.name}
					</Text>
					<Text> on </Text>
					<Text
						style={[styles.specialColor, { maxWidth: 100 }]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{new Date(post.dateAdded).toLocaleDateString()}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default PostDetails;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 25,
		alignItems: "center",
		paddingBottom: 100,
	},
	avatar: {
		width: 50,
		height: 50,
		marginRight: 25,
	},
	imageContainer: {
		width: "100%",
		alignItems: "center",
	},
	image: { width: "100%", aspectRatio: 1, borderRadius: 25 },
	uploaderContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: Colors.secondary,
		borderRadius: 50,
	},
	addressContainer: {
		paddingTop: 25,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	specialColor: {
		color: Colors.primary,
	},
	bubbleContainer: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 15,
		width: "100%",
	},
});
