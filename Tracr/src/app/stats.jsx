import { StyleSheet, View } from "react-native";

export default function StatsScreen() {
  const backgroundImg =
    "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  return (
    <View style={styles.container}>
      <ImageBackground
        src={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
});
