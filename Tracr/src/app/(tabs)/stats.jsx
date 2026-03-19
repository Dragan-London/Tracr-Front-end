import AverageView from "@/src/components/AverageView";
import DropDownMetrics from "@/src/components/DropDownMetrics";
import LoadingPage from "@/src/components/LoadingPage";
import StatsChart from "@/src/components/StatsChart";
import TimeframeButtons from "@/src/components/TimeframeButtons";
import getAverageScore from "@/src/utils/getAverageScore";
import getDateRange from "@/src/utils/getDateRange";
import getMonthlyAverages from "@/src/utils/getMonthlyAverages";
import parseExpeditions from "@/src/utils/parseExpeditions";
import { Text } from "@react-navigation/elements";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  const [timeframe, setTimeframe] = useState("week");
  const [metric, setMetric] = useState("accuracy");
  const [score, setScore] = useState(null);
  const [totalShapes, setTotalShapes] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);

  const backgroundImg =
    "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  useEffect(() => {
    async function getExpeditions() {
      try {
        const user_id = 1;
        const { data } = await axios(
          `https://tracr-c546.onrender.com/api/users/${user_id}/expeditions?time=${timeframe}`,
        );
        const { expeditions } = data;
        const parsedExpeditions = parseExpeditions(expeditions, timeframe);
        if (timeframe === "year") {
          const monthlyAverages = getMonthlyAverages(parsedExpeditions);
          const dataPoints = monthlyAverages.map((month) => {
            return month[metric];
          });
          setData(dataPoints);
        } else {
          const dataPoints = parsedExpeditions.map((trace) => {
            return trace[metric];
          });
          setData(dataPoints);
        }

        setScore(getAverageScore(parsedExpeditions, metric));
        setTotalShapes(expeditions.length);
        if (expeditions) setLoading(false);
        setDateRange(getDateRange(timeframe));
      } catch (err) {
        console.log(err);
      }
    }
    getExpeditions();
  }, [metric, timeframe]);

  if (loading) return <LoadingPage />;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        src={backgroundImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.streak}>
        <Image
          source={require("@/assets/images/fire.png")}
          style={styles.fireImage}
        />
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
          totalShapes={totalShapes}
          timeframe={timeframe}
        />
      </View>
      <StatsChart
        data={data}
        dateRange={dateRange}
        timeframe={timeframe}
        metric={metric}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  fireImage: {
    position: "absolute",
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  streak: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  streakText: {
    fontFamily: "ui-monospace",
    fontSize: "50",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    color: "black",
    paddingTop: 15,
  },
});
