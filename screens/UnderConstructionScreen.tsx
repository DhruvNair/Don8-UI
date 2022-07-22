import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

const UnderConstructionScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Oops! This area is still under construction!
			</Text>
			<LottieView
				style={styles.underConstructionLottie}
				autoPlay
				source={require("../assets/lottie/under-construction.json")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		opacity: 0.5,
		width: "70%",
		textAlign: "center",
		fontWeight: "bold",
	},
	underConstructionLottie: {
		width: 300,
		height: 300,
		marginLeft: 20,
	},
});

export default UnderConstructionScreen;
