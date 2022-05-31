import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ReduxProvider store={store}>
				<PaperProvider>
					<SafeAreaProvider>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</SafeAreaProvider>
				</PaperProvider>
			</ReduxProvider>
		);
	}
}
