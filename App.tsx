import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store";
import { Provider as PaperProvider } from "react-native-paper";
import runInterceptor from "./services/interceptor";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	useEffect(() => {
		runInterceptor();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ReduxProvider store={store}>
				<PaperProvider>
					<Navigation colorScheme={colorScheme} />
				</PaperProvider>
			</ReduxProvider>
		);
	}
}
