import { shapes } from "@/data/shapes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";

export default function ExpeditionDetailScreen() {
  const navigation = useNavigation();
  const {
    svgPoints: points,
    title,
    distance,
    accuracy,
    shapeId,
  } = useLocalSearchParams();

  function handleBack() {
    navigation.goBack();
  }

  let targetShape = null;
  if (shapeId) {
    const id = parseInt(shapeId, 10);
    targetShape = shapes.find((shape) => shape.id === id);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg",
        }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title || "Expedition"}</Text>
      </View>
      <View style={styles.drawingContainer}>
        {points ? (
          <Svg height="100%" width="100%" viewBox="0 0 10000 10000">
            {targetShape && (
              <Polyline
                points={targetShape.path
                  .map((p) => `${p.x * 10000},${p.y * 10000}`)
                  .join(" ")}
                stroke="blue"
                strokeWidth="400"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.4"
              />
            )}
            <Polyline
              transform="scale (10000, 10000)"
              points={points}
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
              vectorEffect="non-scaling-stroke"
            />
          </Svg>
        ) : (
          <Text style={styles.noDataText}>No drawing available</Text>
        )}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Distance</Text>
          <Text style={styles.infoValue}>
            {distance ? `${distance} m` : "-"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Accuracy</Text>
          <Text style={styles.infoValue}>
            {accuracy ? `${accuracy}%` : "-"}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  drawingContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  backButton: {
    backgroundColor: "#5cbdfd",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    marginBottom: 30,
  },
  backButtonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
