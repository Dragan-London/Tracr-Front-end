import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function AverageView({ metric, score, totalShapes, timeframe }) {
  const [icon, setIcon] = useState(require("@/assets/images/scoreIcon.png"));

  useEffect(() => {
    switch (metric) {
      case "score":
        setIcon(require("@/assets/images/scoreIcon.png"));
        break;
      case "distance":
        setIcon(require("@/assets/images/distance.png"));
        break;
      case "duration":
        setIcon(require("@/assets/images/stopwatch.png"));
    }
  }, [metric]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreCard}>
        <View style={styles.iconAndScore}>
          <Image source={icon} style={styles.icon} />
          <View style={styles.scoreContainer}>
            <Text style={[styles.averageScore, styles.text]}>{score}</Text>
            <Text style={[styles.metric, styles.text]}>{metric}</Text>
          </View>
        </View>
      </View>
      <View style={styles.scoreCard}>
        <View style={styles.iconAndScore}>
          <View>
            <Image
              source={require("@/assets/images/cropped-red-heart.jpg")}
              style={styles.icon}
            />
          </View>
          <View style={[styles.scoreContainer, styles.text]}>
            <Text style={[styles.averageScore, styles.text]}>
              {totalShapes}
            </Text>
            <Text style={[styles.metric, styles.text]}>Total shapes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scoreCard: {
    flexDirection: "column",
    width: 170,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    backgroundColor: "white",
    padding: 15,
  },
  icon: {
    resizeMethod: "contain",
    width: 40,
    height: 40,
    marginBottom: 10,
    marginRight: 10,
  },
  scoreContainer: {
    flexDirection: "column",
  },
  averageScore: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ui-monospace",
  },
  metric: {
    fontFamily: "ui-monospace",
    fontSize: 12,
    marginBottom: 10,
  },
  iconAndScore: {
    borderBottomColor: "#bdbdbd",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "stretch",
    paddingBottom: 7,
  },
});
