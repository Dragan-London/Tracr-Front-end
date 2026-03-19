import { View, StyleSheet } from "react-native";

export default function DebugGrid({ target, user, size = 200 }) {
  const gridSize = target.length;
  const cellSize = size / gridSize;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {target.map((row, y) =>
        row.map((_, x) => {
          const isTarget = target[y][x] === 1;
          const isUser = user[y][x] === 1;

          let backgroundColor = "transparent";

          if (isTarget && isUser) backgroundColor = "green";      // hit
          else if (isTarget) backgroundColor = "red";         // target
          else if (isUser) backgroundColor = "grey";            // user

          return (
            <View
              key={`${x}-${y}`}
              style={{
                position: "absolute",
                left: x * cellSize,
                top: y * cellSize,
                width: cellSize,
                height: cellSize,
                backgroundColor,
                opacity: 0.6,
              }}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});