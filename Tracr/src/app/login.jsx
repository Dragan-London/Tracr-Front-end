import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";

import { ThemedText } from "@/src/components/themed-text";

export default function MainScreen() {
  const { width, height } = useWindowDimensions();
  const imageSize = (height * 1.6) / 3;

  function handlePress() {
    console.log("pressed!");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Tracer_img_no.6.png")}
        style={[styles.logo, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            styles.libraryButton,
          ]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/sign-up")}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            styles.startButton,
          ]}
        >
          <Text>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  logo: {
    marginBottom: 40,
    mixBlendMode: "multiply",
  },
  buttonsContainer: {
    width: "60%",
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
  },
  buttonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    fontFamily: "ui-monospace",
  },
});
