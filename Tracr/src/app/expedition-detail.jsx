import { shapes } from "@/data/shapes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";

// function getPolylinePoints(svgText) {
// 	if (typeof svgText !== "string") {
// 		return null;
// 	}

// 	const start = svgText.indexOf('points="');
// 	if (start === -1) {
// 		return null;
// 	}

// 	const pointsStart = start + 8;
// 	const pointsEnd = svgText.indexOf('"', pointsStart);
// 	if (pointsEnd === -1) {
// 		return null;
// 	}

// 	return svgText.slice(pointsStart, pointsEnd);
// }

export default function ExpeditionDetailScreen() {
	const navigation = useNavigation();
	const {
		svgPoints: points,
		title,
		distance,
		accuracy,
		shapeId,
	} = useLocalSearchParams();

	function handleBack() {
		navigation.goBack();
	}

	let targetShape = null;
	if (shapeId) {
		const id = parseInt(shapeId, 10);
		targetShape = shapes.find((shape) => shape.id === id);
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{
					uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg",
				}}
				resizeMode="cover"
				style={styles.backgroundImage}
			/>

			<View style={styles.header}>
				<Text style={styles.headerTitle}>{title || "Expedition"}</Text>
			</View>
			<View style={styles.drawingContainer}>
				{points ? (
					<Svg height="100%" width="100%" viewBox="0 0 10000 10000">
						{targetShape && (
							<Polyline
								points={targetShape.path
									.map((p) => `${p.x * 10000},${p.y * 10000}`)
									.join(" ")}
								stroke="blue"
								strokeWidth="400"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="none"
								opacity="0.4"
							/>
						)}
						<Polyline
							transform="scale (10000, 10000)"
							points={points}
							stroke="red"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
							opacity="0.9"
							vectorEffect="non-scaling-stroke"
						/>
					</Svg>
				) : (
					<Text style={styles.noDataText}>No drawing available</Text>
				)}
			</View>
			<View style={styles.infoContainer}>
				{distance ? (
					<Text style={styles.infoText}>Distance: {distance} m</Text>
				) : null}

				{accuracy ? (
					<Text style={styles.infoText}>Accuracy: {accuracy}%</Text>
				) : null}
			</View>

			<Pressable
				onPress={handleBack}
				style={({ pressed }) => [
					styles.backButton,
					pressed && styles.backButtonPressed,
				]}
			>
				<Text style={styles.backButtonText}>Back</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f4ff",
		paddingTop: 60,
		paddingHorizontal: 16,
	},
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
		opacity: 0.1,
	},
	header: {
		marginBottom: 20,
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	drawingContainer: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: 12,
		marginBottom: 20,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#ddd",
	},
	noDataText: {
		textAlign: "center",
		fontSize: 16,
		color: "#999",
		marginTop: 20,
	},
	infoContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	infoText: {
		fontSize: 14,
		color: "#333",
		marginVertical: 4,
	},
	backButton: {
		backgroundColor: "#5cbdfd",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#000",
		alignItems: "center",
		marginBottom: 30,
	},
	backButtonPressed: {
		transform: [{ translateX: 1 }, { translateY: 1 }],
	},
	backButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
	},
});
