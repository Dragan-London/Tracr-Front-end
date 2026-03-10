import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/src/components/themed-text";

const pages = [
  { label: "Home", route: "/(tabs)/" },
  { label: "Sign Up", route: "/sign-up" },
  { label: "Main", route: "/main" },
  { label: "Map", route: "/map" },
  { label: "Post Drawing", route: "/post-drawing" },
  { label: "Stats", route: "/stats" },
  { label: "Collection", route: "/collection" },
  { label: "Leaderboard", route: "/leaderboard" },
  { label: "Gallery", route: "/gallery" },
] as const;

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        Explore
      </ThemedText>
      {pages.map((page) => (
        <TouchableOpacity
          key={page.route}
          style={styles.button}
          onPress={() => router.push(page.route as any)}
        >
          <ThemedText type="defaultSemiBold">{page.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  heading: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
  },
});
