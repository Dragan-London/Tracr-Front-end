import { Text } from "@react-navigation/elements";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Polyline, Svg } from "react-native-svg";
import { shapes } from "../../../data/shapes";

export default function HomeScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [dailyShapePoints, setDailyShapePoints] = useState(null);
	const [dailyShapePath, setDailyShapePath] = useState(null);

	function handleStartPress() {
		router.push("/map");
	}

	function handleLibraryPress() {
		router.push("/library");
	}

	function convertPointsToPath(points) {
		const path = points.map((point) => `${point.x},${point.y}`).join(" ");

		return path;
	}

	function findDailyShapePoints(dailyShapeId) {
		for (let shape of shapes) {
			if (shape.id === dailyShapeId) {
				setDailyShapePath(shape.path);
				return convertPointsToPath(shape.path);
			}
		}
		return null;
	}

	function calculateViewBox(points, padding = 0.05) {
		const minX = Math.min(...points.map((p) => p.x)) - padding;
		const minY = Math.min(...points.map((p) => p.y)) - padding;
		const maxX = Math.max(...points.map((p) => p.x)) + padding;
		const maxY = Math.max(...points.map((p) => p.y)) + padding;

		return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
	}

	useEffect(() => {
		async function getDailyShape() {
			setLoading(true);
			try {
				const {
					data: { dailyShape },
				} = await axios.get(
					"https://tracr-c546.onrender.com/api/shapes/daily",
				);

				setDailyShapePoints(findDailyShapePoints(dailyShape.shape_id));
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getDailyShape();
	}, []);

	const backgroundImg =
		"https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

	return (
		<SafeAreaProvider style={styles.homePageBody}>
			<ImageBackground
				src={backgroundImg}
				resizeMode="cover"
				style={styles.backgroundImage}
			/>
			<SafeAreaView style={styles.dailyChallenge}>
				<Text style={styles.dailyChallengeText}>DAILY CHALLENGE</Text>
				<View style={styles.drawingContainer}>
					{loading ? (
						<ActivityIndicator size="large" color="blue" />
					) : error ? (
						<Text style={styles.errorText}>
							Something bad happened
						</Text>
					) : (
						<Svg
							height="100%"
							width="100%"
							viewBox={calculateViewBox(dailyShapePath)}
							stroke="blue"
							strokeWidth="0.015"
							fill="none"
						>
							<Polyline points={dailyShapePoints} />
						</Svg>
					)}
				</View>
			</SafeAreaView>
			<SafeAreaView>
				<Pressable
					onPress={handleLibraryPress}
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
						styles.libraryButton,
					]}
				>
					<Text style={styles.buttonText}>Library of Shapes</Text>
				</Pressable>
				<Pressable
					onPress={handleStartPress}
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
						styles.startButton,
					]}
				>
					<Text>START</Text>
				</Pressable>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	homePageBody: {
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: 25,
	},
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
		opacity: 0.1,
	},
	dailyChallenge: {
		marginTop: 100,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
	dailyChallengeText: {
		fontWeight: "bold",
		fontSize: 25,
		marginBottom: 5,
		fontFamily: "ui-monospace",
	},
	image: {
		width: 300,
		height: 300,
		alignSelf: "center",
		paddingVertical: 10,
		paddingHorizontal: 23,
		marginBottom: 10,
		borderWidth: 3,
		borderColor: "#b3b3b4",
		borderRadius: 12,
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 0,
		elevation: 2,
		textAlign: "center",
		offsetX: 10,
		offsetY: -3,
		blurRadius: "15px",
		spreadDistance: "10px",
		color: "red",
		inset: true,
	},
	drawingContainer: {
		height: 270,
		width: 270,
		backgroundColor: "white",
		borderRadius: 12,
		marginBottom: 3,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#ddd",
		alignItems: "center",
		justifyContent: "center",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
	libraryButton: {
		backgroundColor: "#5cbdfd",
		textAlign: "center",
	},
	startButton: {
		backgroundColor: "#5cfd5c",
		textAlign: "center",
	},
	button: {
		paddingVertical: 10, // 0.6em ≈ 10px (based on 18px font size)
		paddingHorizontal: 23, // 1.3em ≈ 23px
		marginBottom: 10,
		fontWeight: "900",
		fontSize: 18,
		borderWidth: 3,
		borderColor: "black",
		borderRadius: 7, // 0.4em ≈ 7px
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 }, // 0.1em ≈ 2px
		shadowOpacity: 1,
		shadowRadius: 0,
		elevation: 2, // Android shadow
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		color: "black",
	},
	buttonPressed: {
		transform: [{ translateX: 1 }, { translateY: 1 }],
		shadowOffset: { width: 1, height: 1 },
	},
	buttonText: {
		fontFamily: "ui-monospace",
	},
});
