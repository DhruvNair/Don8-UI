import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import {
	Provider as PaperProvider,
	DefaultTheme as DefaultPaperTheme,
	DarkTheme as DarkPaperTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import RootNavigator from "./main";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	const currentPaperThemeToUse =
		colorScheme === "dark" ? DarkPaperTheme : DefaultPaperTheme;
	const paperTheme = {
		...currentPaperThemeToUse,
		colors: {
			...currentPaperThemeToUse.colors,
			primary: Colors.primary,
		},
	};
	return (
		<SafeAreaView style={StyleSheet.absoluteFill}>
			<StatusBar
				backgroundColor={
					colorScheme === "dark"
						? Colors.dark.background
						: Colors.light.background
				}
			/>
			<PaperProvider theme={paperTheme}>
				<NavigationContainer
					theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
				>
					<RootNavigator />
				</NavigationContainer>
			</PaperProvider>
		</SafeAreaView>
	);
}
