import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function StatsChart() {
  const [spaces, setSpaces] = useState(7);
  const [period, setPeriod] = useState("day");
  const data = [
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 40 },
    { value: 40 },
    { value: 40 },
    { value: 40 },
  ];

  // useEffect(() => setSpaces(7), []);

  // switch (period) {
  //   case "day":
  //     setSpaces(7);
  //     break;
  //   case "month":
  //     setSpaces(10);
  //     break;
  //   case "year":
  //     setSpaces(12);
  //     break;
  //   case "all time":
  //     setSpaces(24);
  // }

  return (
    <View style={styles.container}>
      <LineChart
        style={styles.lineChart}
        data={data}
        // hideDataPoints
        // hideRules
        // hideYAxisText
        curved
        isAnimated
        color="#04e704"
        thickness={5}
        initialSpacing={0}
        endSpacing={0}
        spacing={200 / spaces - 1}
        width={200}
        // verticalLinesSpacing={spaces}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7, // 0.4em ≈ 7px
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 }, // 0.1em ≈ 2px
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2, // Android shadow
    marginTop: 20,
    paddingTop: 20,
    paddingLeft: 20,
    width: "100%",
  },
});
