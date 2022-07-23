const server_url = "https://don8heroku.herokuapp.com/api";

export default {
	auth: {
		login: server_url + "/auth/signin",
		sendRegisterOTP: server_url + "/auth/otp",
		registerUser: server_url + "/auth/signup",
		sendForgotPasswordOTP: server_url + "/auth/forgot",
		resetPassword: server_url + "/auth/password",
		getUserDetails: server_url + "/auth/token",
	},
	user: {
		details: server_url + "/user",
	},
	posts: {
		myPosts: server_url + "/product/byUser",
		allPosts: server_url + "/product",
	},
};
