import { Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function LoadingPage() {
  const backgroundImage =
    "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  return (
    <SafeAreaProvider style={{ alignItems: "center" }}>
      <ImageBackground
        src={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <Image
        style={styles.loadingImage}
        source={require("@/assets/images/blue-A-2.png")}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  loadingImage: {
    resizeMode: "cover",
    marginTop: "50%",
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
});
