import * as React from "react";
import { useState } from "react";
import { getValueFromSecureStorage } from "../helpers/secureStorageHelpers";
import { useReduxDispatch, useReduxSelector } from "../store";
import { setToken } from "../store/auth/token";
import AuthStackNavigator from "./auth/authStack";
import BottomTabNavigator from "./bottomTab";

const RootNavigator = () => {
	const [appReady, setAppReady] = useState(false);
	const startApp = async () => {
		await checkToken();
		setTimeout(() => setAppReady(true), 1000);
	};
	const checkToken = async () => {
		const storedToken = await getValueFromSecureStorage("token");
		if (storedToken) dispatch(setToken(storedToken));
	};
	const dispatch = useReduxDispatch();
	const token = useReduxSelector((state) => state.auth.token);

	return token ? <BottomTabNavigator /> : <AuthStackNavigator />;
};

export default RootNavigator;
