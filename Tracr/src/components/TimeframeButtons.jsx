import { Text } from "@react-navigation/elements";
import { Pressable, StyleSheet, View } from "react-native";

export default function TimeframeButtons({ timeframe, setTimeframe }) {
  function weekPressed() {
    setTimeframe("week");
  }

  function monthPressed() {
    setTimeframe("month");
  }

  function yearPressed() {
    setTimeframe("year");
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={weekPressed}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          timeframe === "week" && styles.buttonIsActive,
        ]}
      >
        <Text style={styles.buttonText}>Week</Text>
      </Pressable>
      <Pressable
        onPress={monthPressed}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          timeframe === "month" && styles.buttonIsActive,
        ]}
      >
        <Text style={styles.buttonText}>Month</Text>
      </Pressable>
      <Pressable
        onPress={yearPressed}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          timeframe === "year" && styles.buttonIsActive,
        ]}
      >
        <Text style={styles.buttonText}>Year</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "30%",
    margin: 5,
    fontWeight: "900",
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
    backgroundColor: "#dceefb",
  },
  buttonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    shadowOffset: { width: 1, height: 1 },
  },
  buttonIsActive: {
    backgroundColor: "#5cbdfd",
  },
  buttonText: {
    fontFamily: "ui-monospace",
    fontSize: 10,
  },
});
