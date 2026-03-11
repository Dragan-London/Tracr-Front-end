import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/src/components/themed-text";

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Leaderboard</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
