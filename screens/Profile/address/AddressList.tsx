import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Toast from "react-native-simple-toast";
import AddressListItem from "../../../components/AddressListItem";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import {
	AddressResponse,
	deleteAddressService,
	getMyAddressesService,
} from "../../../services/addressService";
import { AddressStackScreenProps } from "../../../types";

type Props = AddressStackScreenProps<"AddressList">;

const AddressList = ({ navigation }: Props) => {
	const [loading, setLoading] = useState(false);
	const [allAddresses, setAllAddresses] = useState<AddressResponse[]>([]);
	const getCurrentUserAddresses = async () => {
		try {
			setLoading(true);
			const res = await getMyAddressesService();
			setAllAddresses(res.data.body.content);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const deleteAddress = async (aid: string) => {
		try {
			const res = await deleteAddressService(aid);
			getCurrentUserAddresses();
			Toast.show("Deleted address successfully");
		} catch (e) {
			console.log(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getCurrentUserAddresses();
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
						<Text>No Addresses to display</Text>
					</View>
				)}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				data={allAddresses}
				renderItem={({ item }: { item: AddressResponse }) => (
					<AddressListItem
						address={item}
						editAddress={() =>
							navigation.navigate("EditAddress", {
								initialDetails: item,
							})
						}
						deleteAddress={() => {
							deleteAddress(item.aid);
						}}
					/>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default AddressList;

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
