import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function AverageView({
  metric,
  score,
  totalShapes,
  timeframe,
  scoreDifference,
  totalShapeDifference,
}) {
  const [icon, setIcon] = useState(require("@/assets/images/scoreIcon.png"));

  useEffect(() => {
    switch (metric) {
      case "score":
        setIcon(require("@/assets/images/scoreIcon.png"));
        break;
      case "distance":
        setIcon(require("@/assets/images/distance.png"));
        break;
      case "time":
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
        <View style={styles.comparison}>
          {scoreDifference > 0 ? (
            <Text style={[styles.scorePercent, styles.increasedScore]}>
              ↑{scoreDifference}%
            </Text>
          ) : (
            <Text style={[styles.scorePercent, styles.decreasedScore]}>
              ↓{scoreDifference}%
            </Text>
          )}
          {timeframe === "all time" ? (
            <Text style={styles.timeFrameText}>all time</Text>
          ) : (
            <Text style={styles.timeFrameText}>{timeframe}</Text>
          )}
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
        <View style={styles.comparison}>
          {totalShapeDifference > 0 ? (
            <Text style={[styles.scorePercent, styles.increasedScore]}>
              ↑{totalShapeDifference}%
            </Text>
          ) : (
            <Text style={[styles.scorePercent, styles.decreasedScore]}>
              ↓{totalShapeDifference}%
            </Text>
          )}
          {timeframe === "all time" ? (
            <Text style={styles.timeFrameText}>all time</Text>
          ) : (
            <Text style={styles.timeFrameText}>{timeframe}</Text>
          )}
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
  comparison: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  scorePercent: {
    backgroundColor: "#abffb3",
    borderRadius: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: "ui-monospace",
    textAlign: "right",
  },
  increasedScore: {
    backgroundColor: "#abffb3",
  },
  decreasedScore: {
    backgroundColor: "#ffa0a0",
  },
  timeFrameText: {
    fontFamily: "ui-monospace",
    fontSize: 12,
    fontWeight: "bold",
  },
});
