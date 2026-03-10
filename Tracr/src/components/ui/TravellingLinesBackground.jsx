import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const NUM_LINES = 12;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Line() {
  const isHorizontal = useRef(Math.random() > 0.5).current;
  const position = useRef(
    randomBetween(0, isHorizontal ? height : width),
  ).current;
  const thickness = useRef(randomBetween(0.5, 5)).current;
  const duration = useRef(randomBetween(14000, 28000)).current;
  const delay = useRef(randomBetween(0, 6000)).current;

  const translate = useRef(
    new Animated.Value(isHorizontal ? -width : -height),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translate.setValue(isHorizontal ? -width : -height);
      opacity.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translate, {
            toValue: isHorizontal ? width : height,
            duration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.25,
              duration: duration * 0.075, // fade in
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.25,
              duration: duration * 0.85, // hold
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: duration * 0.075, // fade out
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.line,
        isHorizontal
          ? {
              // horizontal line — travels left to right
              width: width * 2,
              height: thickness * 2,
              top: position,
              left: 0,
              transform: [{ translateX: translate }],
            }
          : {
              // vertical line — travels top to bottom
              width: thickness * 2,
              height: height * 2,
              left: position,
              top: 0,
              transform: [{ translateY: translate }],
            },
        { opacity },
      ]}
    />
  );
}

export default function TravellingLinesBackground() {
  const lines = Array.from({ length: NUM_LINES }, (_, i) => <Line key={i} />);

  return <View style={styles.container}>{lines}</View>;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  line: {
    position: "absolute",
    backgroundColor: "#e16f6f",
  },
});
