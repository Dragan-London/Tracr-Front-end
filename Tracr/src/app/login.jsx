import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

const backgroundImg =
  "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

export default function MainScreen() {
  const { height } = useWindowDimensions();
  const imageSize = (height * 1.6) / 3;
  const { setUser } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLoginSubmit() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://tracr-c546.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log("Logged in:", data);
      setUser(data.user);
      setModalVisible(false);
      router.replace("/(tabs)");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImg }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <Image
        source={require("@/assets/images/Tracr-logo.png")}
        style={[styles.logo, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Login</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="oneTimeCode"
            />

            <Pressable
              style={styles.submitButton}
              onPress={handleLoginSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Logging in..." : "Submit"}
              </Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => setModalVisible(true)}
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
    paddingTop: 86,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  logo: {
    marginBottom: 40,
    opacity: 1,
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
    fontWeight: "900",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#5cbdfd",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  cancelText: {
    color: "#888",
    textDecorationLine: "underline",
  },
});
