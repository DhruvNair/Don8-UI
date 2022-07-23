import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import AddressForm from "../../../../screens/Profile/address/AddressForm";
import AddressList from "../../../../screens/Profile/address/AddressList";
import UnderConstructionScreen from "../../../../screens/UnderConstructionScreen";
import { useReduxDispatch } from "../../../../store";
import { setTabBarVisible } from "../../../../store/app/tabBar";
import { AddressStackParamList } from "../../../../types";

const Stack = createNativeStackNavigator<AddressStackParamList>();

const AddressStackNavigator = () => {
	const dispatch = useReduxDispatch();
	useEffect(() => {
		dispatch(setTabBarVisible(false));

		return () => {
			dispatch(setTabBarVisible(true));
		};
	}, []);

	return (
		<Stack.Navigator initialRouteName="AddressList">
			<Stack.Screen
				name="AddressList"
				options={({ navigation }) => ({
					headerTitle: "My Addresses",
					headerRight: () => {
						return (
							<IconButton
								icon="plus"
								onPress={() => {
									navigation.navigate("EditAddress", {});
								}}
							/>
						);
					},
				})}
				component={AddressList}
			/>
			<Stack.Screen
				options={{ headerTitle: "Add Address" }}
				name="EditAddress"
				component={AddressForm}
			/>
		</Stack.Navigator>
	);
};

export default AddressStackNavigator;

const styles = StyleSheet.create({});
