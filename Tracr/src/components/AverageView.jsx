import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function AverageView({
  metric,
  score,
  distance,
  minutes,
  totalShapes,
  timeframe,
}) {
  const [icon, setIcon] = useState(require("@/assets/images/scoreIcon.png"));
  const [metricScore, setMetricScore] = useState(`${score}%`);
  //average metric score + comparison

  useEffect(() => {
    switch (metric) {
      case "score":
        setIcon(require("@/assets/images/scoreIcon.png"));
        setMetricScore(`${score}%`);
        break;
      case "distance":
        setIcon(require("@/assets/images/distance.png"));
        setMetricScore(`${distance}m`);
        break;
      case "time":
        setIcon(require("@/assets/images/stopwatch.png"));
        setMetricScore(`${minutes} mins`);
    }
  }, [metric]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreCard}>
        <View style={styles.iconAndScore}>
          <Image source={icon} style={styles.icon} />
          <View style={styles.scoreContainer}>
            <Text style={styles.averageScore}>{metricScore}</Text>
            <Text style={styles.metric}>{metric}</Text>
          </View>
        </View>
        <View style={styles.comparison}>
          <Text>^26%</Text>
          {timeframe === "all time" ? (
            <Text>All time</Text>
          ) : (
            <Text>This {timeframe}</Text>
          )}
        </View>
      </View>
      <View style={styles.scoreCard}>
        <View style={styles.iconAndScore}>
          <Image
            source={require("@/assets/images/red-outline-heart2.jpg")}
            style={styles.icon}
          />
          <View style={styles.scoreContainer}>
            <Text style={styles.averageScore}>{totalShapes}</Text>
            <Text style={styles.metric}>Shapes completed</Text>
          </View>
        </View>
        <View style={styles.comparison}>
          <Text>^26%</Text>
          {timeframe === "all time" ? (
            <Text>All time</Text>
          ) : (
            <Text>This {timeframe}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreCard: {
    flexDirection: "column",
    width: 160,
    height: 125,
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
    // marginTop: 20,
    // marginBottom: 20,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  icon: {
    resizeMethod: "contain",
    width: 47,
    height: 47,
    marginBottom: 10,
  },
  scoreContainer: {
    flex: 1,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: 10,
  },
  comparison: {
    flex: 1,
    flexDirection: "row",
  },
});
