import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function StatsChart({ data, dateRange, timeframe, metric }) {
  const [spaces, setSpaces] = useState(7);
  const [dataSet, setDataSet] = useState(null);

  console.log("data in stats chart>>", data);

  const week = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  const month = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];
  const year = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];

  useEffect(() => {
    if (data === null) return;
    const dataPoints = data.map((dataPoint, i) => {
      if (timeframe === "week") {
        setSpaces(7);
        return {
          value: dataPoint.data,
          label: week[new Date(dataPoint.timestamp).getDay()],
        };
      } else if (timeframe === "month") {
        setSpaces(30);
        return {
          value: dataPoint.data,
          label: month[Number(dataPoint.timestamp.slice(8, 10)) - 1],
        };
      } else if (timeframe === "year") {
        setSpaces(12);
        console.log("year??>>", dataPoint.timestamp);
        return {
          value: dataPoint.data,
          label: dataPoint.month,
        };
      }
      return { value: dataPoint, label: i + 1 };
    });
    setDataSet(dataPoints);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.stats}>Stats</Text>
      <Text>{dateRange}</Text>
      {dataSet && (
        <LineChart
          style={styles.lineChart}
          data={dataSet}
          maxValue={metric === "accuracy" ? 100 : undefined}
          hideDataPoints
          yAxisThickness={0}
          xAxisLabelsAtBottom
          rotateLabel
          curved
          isAnimated
          color="#5cbdfd"
          thickness={5}
          adjustToWidth
          initialSpacing={1}
          spacing={timeframe === "month" ? 1000 / spaces : 500 / spaces + 1}
          noOfSections={5}
          width={250}
        />
      )}
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
    // marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  stats: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ui-monospace",
  },
});
