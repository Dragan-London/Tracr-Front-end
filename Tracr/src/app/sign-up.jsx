import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { router } from "expo-router";

const backgroundImg =
  "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const placeholderColor = "#666";

  async function handleSubmit() {
    setError(null);

    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length > 50) {
      setError("Name must be less than 50 characters.");
      return;
    }
    if (username.length > 25) {
      setError("Username must be less than 25 characters.");
      return;
    }
    if (password.length > 25) {
      setError("Password must be less than 25 characters.");
      return;
    }
    if (!email.includes("@")) {
      setError("Password must include @");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://tracr-c546.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, name }),
        },
      );

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

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
        src={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={placeholderColor}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={placeholderColor}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={placeholderColor}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={placeholderColor}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="oneTimeCode"
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        placeholderTextColor={placeholderColor}
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
        textContentType="oneTimeCode"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
    color: "#111",
  },
  button: {
    width: "100%",
    backgroundColor: "#5cfd5c",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "900",
  },
  link: {
    color: "#888",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
