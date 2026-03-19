import { StyleSheet, View, Pressable, Modal, ImageBackground, Animated, useAnimatedValue, Share } from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/src/components/themed-text";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Svg, { Polyline } from "react-native-svg";
import { interpolatePaths, calculateHits } from "../utils/accuracyCalculator"
import { createSvg } from "../utils/pathPlotter";
import DebugGrid from "../components/DebugGrid";
import { ScrollView } from "react-native";

export default function ResultsScreen() {
  const [accuracy, setAccuracy] = useState(0);
  const [points, setPoints] = useState(0);
  const [svgData, setSvgData] = useState({
    user: { svgString: "" },
    target: { svgString: "" }
  });
  const navigation = useNavigation();

  const [debugGrids, setDebugGrids] = useState({
    target: null,
    user: null,
  });

  const { shape, runCoords } = useLocalSearchParams();
  const selectedShape = JSON.parse(shape);
  // const userPath = JSON.parse(runCoords);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const userPath = [
    { "latitude": -32.2515089, "longitude": 148.6301891 }, // Bottom Tip (Starting Point)
    { "latitude": -32.2428263, "longitude": 148.6225300 },
    { "latitude": -32.2339923, "longitude": 148.6161408 },
    { "latitude": -32.2254463, "longitude": 148.6126410 },
    { "latitude": -32.2176107, "longitude": 148.6129534 }, // Far Left Curve
    { "latitude": -32.2110277, "longitude": 148.6172626 },
    { "latitude": -32.2066401, "longitude": 148.6246986 }, // Top Left Lobe
    { "latitude": -32.2064211, "longitude": 148.6324460 },
    { "latitude": -32.2108001, "longitude": 148.6375256 },
    { "latitude": -32.2150135, "longitude": 148.6301891 }, // Top Notch (Deepened Center)
    { "latitude": -32.2108001, "longitude": 148.6228526 },
    { "latitude": -32.2064211, "longitude": 148.6279322 },
    { "latitude": -32.2066401, "longitude": 148.6356678 }, // Top Right Lobe
    { "latitude": -32.2110277, "longitude": 148.6461156 },
    { "latitude": -32.2176107, "longitude": 148.6514248 }, // Far Right Curve
    { "latitude": -32.2254463, "longitude": 148.6507372 },
    { "latitude": -32.2339923, "longitude": 148.6492374 },
    { "latitude": -32.2428263, "longitude": 148.6388482 },
    { "latitude": -32.2515089, "longitude": 148.6301891 }  // Back to Bottom Tip
  ]




  const handleSave = () => {
    navigation.navigate("stats")
  }

  const handleRetry = () => {
    navigation.navigate("map")
  }

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "My Tracr run results"
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const slideRightAnim = useAnimatedValue(-180)
  const slideLeftAnim = useAnimatedValue(180)
  const accuracyAnim = useAnimatedValue(0);
  const pointsAnim = useAnimatedValue(0);
  const saveAnim = useAnimatedValue(0);
  const retryAnim = useAnimatedValue(0);
  const shareAnim = useAnimatedValue(0);

  useEffect(() => {
    const targetArray = selectedShape.path.map(p => [p.x, p.y]);
    const userArray = userPath.map(p => [p.longitude, -p.latitude]);

    const targetSvg = createSvg(targetArray, 300);
    const userSvg = createSvg(userArray, 300);

    setSvgData({ user: userSvg, target: targetSvg });

    const targetGrid = interpolatePaths(targetSvg.points, 50, 0);
    const userGrid = interpolatePaths(userSvg.points, 50, 2);
    const score = calculateHits(targetGrid, userGrid);

    setDebugGrids({
      target: targetGrid,
      user: userGrid,
    });

    const accuracyListener = accuracyAnim.addListener(({ value }) => {
      setAccuracy(Math.floor(value));
    })

    const pointsListener = pointsAnim.addListener(({ value }) => {
      setPoints(Math.floor(value));
    });
    Animated.sequence([

      Animated.parallel([
        Animated.timing(slideRightAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(slideLeftAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(accuracyAnim, {
          toValue: score,
          duration: 2500,
          useNativeDriver: false,
        })
      ]),

      Animated.delay(300),

      Animated.timing(pointsAnim, {
        toValue: Math.round(score * 5 / 100) * 200,
        duration: 2000,
        useNativeDriver: false,
      }),

      Animated.delay(300),

      Animated.stagger(400, [
        Animated.timing(saveAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(retryAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shareAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])

    ]).start();

    return () => {
      accuracyAnim.removeListener(accuracyListener);
      pointsAnim.removeListener(pointsListener)
    };

  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg" }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <View style={styles.imagesContainer}>
        <AnimatedSvg width={300} height={300} style={[
          styles.userRoute,
          { transform: [{ translateX: slideRightAnim }] },]}>
          <Polyline
            points={svgData.user.svgString}
            fill="none"
            stroke="red"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </AnimatedSvg>

        <AnimatedSvg width={300} height={300} style={[
          styles.targetRoute,
          { transform: [{ translateX: slideLeftAnim }] },]}>
          <Polyline
            points={svgData.target.svgString}
            fill="none"
            stroke="red"
            strokeWidth="4"
          />
        </AnimatedSvg>
      </View>

      <View style={styles.scoresContainer}>
        <ThemedText style={styles.accuracyText}>{accuracy}% MATCH</ThemedText>
        <ThemedText style={styles.pointsText}>{points} POINTS</ThemedText>
      </View>

      <View style={styles.actionButtonsContainer}>
        <Animated.View style={{ opacity: saveAnim }}>
          <Pressable
            onPress={() => handleSave()}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              styles.saveButton
            ]}>
            <ThemedText>Save</ThemedText>
          </Pressable>
        </Animated.View>


        <Animated.View style={{ opacity: retryAnim }}>
          <Pressable
            onPress={() => handleRetry()}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              styles.retryButton,
            ]}>
            <ThemedText>Retry</ThemedText>
          </Pressable>
        </Animated.View>
      </View>
      <Animated.View style={{ opacity: shareAnim }}>
        <Pressable
          onPress={() => handleShare()}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            styles.shareButton,
          ]}>
          <ThemedText>Share</ThemedText>
        </Pressable>
      </Animated.View>
      <View>
        {/* Please keep the code here for debugging */}
        {/* {debugGrids.target && (
          <DebugGrid
            target={debugGrids.target}
            user={debugGrids.user}r
            size={300}
            alignItems="center"
          />
        )} */} 
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imagesContainer: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },

  userRoute: {
    width: 300,
    height: 300,
    position: "absolute",
  },

  targetRoute: {
    width: 300,
    height: 300,
    position: "absolute",
    opacity: 0.5,
  },

  scoresContainer: {
    marginVertical: 25,
    alignItems: "center",
  },

  accuracyText: {
    fontSize: 24,
  },

  pointsText: {
    fontSize: 18
  },

  actionButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: "#84f984",
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#cdcecd",
    textAlign: "center",
  },

  shareButton: {
    backgroundColor: "#5f98f3",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 220,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    marginBottom: 10,
    fontWeight: "900",
    fontSize: 18,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "black",
    width: 150,
  },

  buttonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    shadowOffset: { width: 1, height: 1 },
  }

});
