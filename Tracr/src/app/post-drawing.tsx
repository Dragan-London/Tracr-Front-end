import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/src/components/themed-text";

export default function PostDrawingScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Post Drawing</ThemedText>
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
