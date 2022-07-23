import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Address } from "../services/addressService";
import { Text, View } from "./Themed";

type Props = {
	address: Address;
	deleteAddress: () => void;
	editAddress: () => void;
};
const AddressListItem = ({ address, deleteAddress, editAddress }: Props) => {
	let combinedAddress = "";
	if (address.line1) combinedAddress += address.line1 + ", ";
	if (address.line2) combinedAddress += address.line2 + ", ";
	if (address.city) combinedAddress += address.city + ", ";
	if (address.state) combinedAddress += address.state + ", ";
	if (address.pinCode) combinedAddress += address.pinCode;

	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				paddingVertical: 20,
				paddingLeft: 15,
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flexGrow: 1,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ fontSize: 16, paddingTop: 2, flex: 1 }}>
						{address.name || "Name Unavailable"}
					</Text>
					<View style={{ flexDirection: "row", height: 30 }}>
						<IconButton
							icon="pencil"
							size={20}
							onPress={editAddress}
						/>
						<IconButton
							icon="delete-outline"
							color={"red"}
							size={20}
							onPress={deleteAddress}
						/>
					</View>
				</View>
				<Text style={{ fontSize: 12, paddingBottom: 5 }}>
					{address.phoneNumber
						? "Contact: " + address.phoneNumber
						: "Contact Unavailable"}
				</Text>
				<Text
					style={{
						fontSize: 14,
						maxWidth: "90%",
					}}
				>
					{combinedAddress || "Full address"}
				</Text>
			</View>
		</View>
	);
};

export default AddressListItem;

const styles = StyleSheet.create({});
