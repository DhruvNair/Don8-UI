import Axios from "axios";
import Toast from "react-native-simple-toast";
import store from "../store";

const runInterceptor = () => {
	Axios.interceptors.request.use(
		(conf) => {
			conf.timeout = 5000;
			if (conf.headers)
				conf.headers.Authorization = store.getState().auth.token;
			return conf;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	Axios.interceptors.response.use(
		(value) => {
			return Promise.resolve(value);
		},
		(error) => {
			handleError(error);
			return Promise.reject(error);
		}
	);
};

const handleError = (error: { message: string }) => {
	try {
		console.log(error);
		if (error.message.includes("timeout")) {
			Toast.show(
				"Couldn't connect to the server. Please check your internet connectivity!",
				Toast.LONG
			);
		} else {
			if (!error.message.includes("Request failed with status code 400"))
				Toast.show(
					"An unexpected error occured. Please try again later.",
					Toast.LONG
				);
		}
	} catch (e) {
		console.log(e);
	}
};

export default runInterceptor;
