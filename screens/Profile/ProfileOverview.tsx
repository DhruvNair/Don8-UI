import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Divider, List, Paragraph, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { ProfileStackScreenProps } from "../../types";

type Props = ProfileStackScreenProps<"ProfileOverview">;

const ProfileOverviewScreen = ({ navigation }: Props) => {
	const dispatch = useReduxDispatch();
	const userDetails = useReduxSelector((state) => state.auth.userDetails);
	return (
		<SafeAreaView
			style={[StyleSheet.absoluteFill, { backgroundColor: "white" }]}
		>
			<View style={[{ flexGrow: 1 }, styles.container]}>
				{!!userDetails.profileImageURL ? (
					<Avatar.Image
						style={styles.avatar}
						size={126}
						source={{ uri: userDetails.profileImageURL }}
					/>
				) : (
					<Avatar.Text
						style={styles.avatar}
						size={126}
						label={(userDetails.displayName[0] || "").toUpperCase()}
					/>
				)}
				<Title style={styles.paragraph}>
					{userDetails.displayName}
				</Title>
				<Paragraph style={styles.paragraph}>
					{userDetails.email}
				</Paragraph>
				<Paragraph style={styles.paragraph}>
					{userDetails.mobile}
				</Paragraph>
				{/* <Caption style={styles.caption}>Change password</Caption> */}
				<View style={styles.listContainer}>
					<List.Item
						onPress={() => {
							navigation.navigate("MyPosts");
						}}
						title="My Posts"
						left={(props) => (
							<List.Icon {...props} icon="post-outline" />
						)}
						right={(props) => (
							<>
								<List.Icon {...props} icon="chevron-right" />
							</>
						)}
						style={styles.listItem}
					/>
					<Divider style={styles.divider} />
					<List.Item
						onPress={() => {
							navigation.navigate("MyAddresses");
						}}
						title="My Addresses"
						left={(props) => (
							<List.Icon
								{...props}
								icon="card-account-mail-outline"
							/>
						)}
						right={(props) => (
							<>
								<List.Icon {...props} icon="chevron-right" />
							</>
						)}
						style={styles.listItem}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ProfileOverviewScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingTop: 11,
		paddingHorizontal: 20,
	},
	avatar: {
		marginVertical: 13,
	},
	paragraph: {
		marginVertical: 7,
	},
	listContainer: {
		width: "100%",
		marginVertical: 15,
	},
	divider: {
		width: "100%",
	},
	listItem: {
		width: "100%",
		paddingRight: 0,
	},
	caption: {
		textDecorationLine: "underline",
		color: Colors.primary,
		marginVertical: 7,
	},
});
