import * as WebBrowser from "expo-web-browser";
import { Button, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { useReduxDispatch, useReduxSelector } from "../store";
import { decrement, increment } from "../store/demo/counter";
import { setName } from "../store/demo/name";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
	const counter = useReduxSelector((state) => state.counter);
	const name = useReduxSelector((state) => state.name);
	const dispatch = useReduxDispatch();
	return (
		<View
			style={{
				alignItems: "center",
				width: "100%",
			}}
		>
			<Text>{counter + "  " + name}</Text>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					justifyContent: "space-around",
				}}
			>
				<Button
					title="increment"
					onPress={() => dispatch(increment(1))}
				>
					+1
				</Button>
				<Button
					title="decrement"
					onPress={() => dispatch(decrement(1))}
				>
					-1
				</Button>
			</View>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					justifyContent: "space-around",
				}}
			>
				<Button
					title="Zorro"
					onPress={() => dispatch(setName("Zorro"))}
				>
					Zorro
				</Button>
				<Button
					title="Dhruv"
					onPress={() => dispatch(setName("Dhruv"))}
				>
					Dhruv
				</Button>
			</View>
		</View>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
	);
}

const styles = StyleSheet.create({
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightContainer: {
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: "center",
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: "center",
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		textAlign: "center",
	},
});
