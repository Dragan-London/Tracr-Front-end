import { StyleSheet, View, Pressable, Modal, ImageBackground, Animated, useAnimatedValue, Share } from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/src/components/themed-text";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Svg, { Polyline } from "react-native-svg";

export default function ResultsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [points, setPoints] = useState(0);
  const navigation = useNavigation();

  const { shape, runCoords } = useLocalSearchParams();
  const selectedShape = JSON.parse(shape);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg)

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
          toValue: 73,
          duration: 2500,
          useNativeDriver: false,
        })
      ]),

      Animated.delay(300),

      Animated.timing(pointsAnim, {
        toValue: 2000,
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
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg" }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <View style={styles.imagesContainer}>
        {/* <Animated.Image
          source={{ uri: "https://images.squarespace-cdn.com/content/v1/5b4dbfd8da02bcfcf39bce03/1710251915806-Z7CK432GWPNKMPPG9OG1/heart4-2022-02-14-at-11.10.03.jpg" }}
          style={[
            styles.userRoute,
            { transform: [{ translateX: slideRightAnim }] },]} /> */}

        {/* <Animated.Image source={require("@/assets/images/red-outline-heart2.jpg")}
          style={[
            styles.targetRoute,
            { transform: [{ translateX: slideLeftAnim }] },]} /> */}
        <AnimatedSvg width={300} height={300} style={[
            styles.targetRoute,
            { transform: [{ translateX: slideLeftAnim }] },]}>
          <Polyline
            points={selectedShape.path
              .map(p => `${p.x * 300},${p.y * 300}`)
              .join(" ")}
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

    </View>
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
