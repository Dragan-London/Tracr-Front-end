import React from "react";
import { Image } from "expo-image";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "@react-navigation/elements";

export default function HomeScreen() {
  function handlePress() {
    console.log("pressed!");
  }

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
        <Image
          style={styles.image}
          source={require("@/assets/images/red-outline-heart2.jpg")}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            styles.libraryButton,
          ]}
        >
          <Text style={styles.buttonText}>Library of Shapes</Text>
        </Pressable>
        <Pressable
          onPress={handlePress}
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
