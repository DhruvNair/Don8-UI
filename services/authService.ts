import axios from "axios";
import APIs from "../constants/APIs";
import store from "../store";

export type UploadableFile = {
	name: string;
	uri: string;
	type: string;
	size?: number;
};

export const loginService = (credentials: {
	email: string;
	password: string;
}) =>
	axios.post(APIs.auth.login, {
		...credentials,
		email: credentials.email.toLowerCase(),
	});

export const sendRegisterOTPService = (email: string) =>
	axios.get(APIs.auth.sendRegisterOTP + "?email=" + email.toLowerCase());

export const registerUserService = (accountDetails: {
	email: string;
	password: string;
	phone: string;
	name: string;
}) =>
	axios.post(APIs.auth.registerUser, {
		...accountDetails,
		email: accountDetails.email.toLowerCase(),
		role: "individual",
	});
export const forgotPasswordOTPService = (email: string) =>
	axios.get(
		APIs.auth.sendForgotPasswordOTP + "?email=" + email.toLowerCase()
	);

export const resetPasswordService = (details: {
	email: string;
	password: string;
}) => axios.post(APIs.auth.resetPassword, details);

export const getMyUserDetailsService = () =>
	axios.get(APIs.auth.getUserDetails);

export const updateUserDetailsService = (
	userDetails: { name: string; email: string; phone: string },
	image?: UploadableFile
) => {
	const { id } = store.getState().auth.userDetails;
	if (id) {
		const reqBody = new FormData();
		reqBody.append(
			"user",
			JSON.stringify({ ...userDetails, role: "individual" })
		);
		if (image) {
			//@ts-ignore
			reqBody.append("image", image);
		}
		return axios.put(APIs.user.details + "/" + id, reqBody, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	} else {
		throw Error("Could not access ID");
	}
};
