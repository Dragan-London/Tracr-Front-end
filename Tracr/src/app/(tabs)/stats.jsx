import AverageView from "@/src/components/AverageView";
import DropDownMetrics from "@/src/components/DropDownMetrics";
import StatsChart from "@/src/components/StatsChart";
import TimeframeButtons from "@/src/components/TimeframeButtons";
import { Text } from "@react-navigation/elements";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function StatsScreen() {
  const [timeframe, setTimeframe] = useState("week");
  const [metric, setMetric] = useState("score");
  const [score, setScore] = useState(null);
  const [distance, setDistance] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [totalShapes, setTotalShapes] = useState(null);

  const backgroundImg =
    "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  //what do we want to see: average score, distance, time. Query with time (7 days, month )
  useEffect(() => {
    async function getExpeditions() {
      try {
        const user_id = 1;
        const { data } = await axios(
          `https://tracr-c546.onrender.com/api/users/${user_id}/expeditions`, //
        );
        const { expeditions } = data;
        setScore(expeditions[0].accuracy);
        setDistance(expeditions[0].distance);
        setMinutes(expeditions[0].duration.minutes);
        setTotalShapes(expeditions.length);
      } catch (err) {
        console.log(err);
      }
    }
    getExpeditions();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        src={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View>
        <Text style={styles.streakText}>3</Text>
      </View>
      <View>
        <DropDownMetrics setMetric={setMetric} />
        <TimeframeButtons timeframe={timeframe} setTimeframe={setTimeframe} />
      </View>
      <View>
        <AverageView
          metric={metric}
          score={score}
          distance={distance}
          minutes={minutes}
          totalShapes={totalShapes}
          timeframe={timeframe}
        />
      </View>
      <StatsChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  streakText: {
    fontFamily: "ui-monospace",
    fontSize: "60",
  },
});
