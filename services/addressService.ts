import axios from "axios";
import APIs from "../constants/APIs";
import store from "../store";

export type Address = {
	name: string;
	phoneNumber: string;
	line1: string;
	line2: string;
	pinCode: string;
	city: string;
	state: string;
	country: string;
};

export type AddressResponse = Address & {
	aid: string;
	gcode?: string;
	longitudeLatitude?: string;
};

export const getMyAddressesService = () => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		return axios.get(APIs.user.details + "/" + id + "/address");
	} else {
		throw Error("Could not access ID");
	}
};

export const saveAddressService = (address: Address) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		return axios.post(APIs.user.details + "/" + id + "/address", address);
	} else {
		throw Error("Could not access ID");
	}
};

export const editAddressService = (address: Address, aid: string) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		return axios.put(
			APIs.user.details + "/" + id + "/address/" + aid,
			address
		);
	} else {
		throw Error("Could not access ID");
	}
};

export const deleteAddressService = (aid: string) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		return axios.put(APIs.user.details + "/" + id + "/address/" + aid);
	} else {
		throw Error("Could not access ID");
	}
};
