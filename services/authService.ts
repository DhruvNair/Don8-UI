import axios from "axios";
import APIs from "../constants/APIs";

export const loginService = (credentials: {
	email: string;
	password: string;
}) => axios.post(APIs.auth.login, credentials);

export const sendRegisterOTPService = (email: string) =>
	axios.get(APIs.auth.sendRegisterOTP + "?email=" + email);

export const registerUserService = (accountDetails: {
	email: string;
	password: string;
	phone: string;
	name: string;
}) =>
	axios.post(APIs.auth.registerUser, {
		...accountDetails,
		role: "individual",
	});
export const forgotPasswordOTPService = (email: string) =>
	axios.get(APIs.auth.sendForgotPasswordOTP + "?email=" + email);
export const resetPasswordService = (details: {
	email: string;
	password: string;
}) => axios.post(APIs.auth.resetPassword, details);
