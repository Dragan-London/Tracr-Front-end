import { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";

const allTimeScores = [
  { id: "1", name: "Tyler Durden", score: 9850 },
  { id: "2", name: "Jane Smith", score: 8720 },
  { id: "3", name: "Alex Johnson", score: 8100 },
  { id: "4", name: "Sam Lee", score: 7650 },
  { id: "5", name: "Chris Evans", score: 7200 },
  { id: "6", name: "Morgan Liu", score: 6980 },
  { id: "7", name: "Jamie Fox", score: 6400 },
  { id: "8", name: "Taylor Knox", score: 5900 },
  { id: "9", name: "Jordan Riley", score: 5500 },
  { id: "10", name: "Casey Morgan", score: 5100 },
];

const dailyScores = [
  { id: "1", name: "Morgan Liu", score: 1200 },
  { id: "2", name: "Tyler Durden", score: 1100 },
  { id: "3", name: "Casey Morgan", score: 980 },
  { id: "4", name: "Jamie Fox", score: 870 },
  { id: "5", name: "Sam Lee", score: 800 },
  { id: "6", name: "Jordan Riley", score: 750 },
  { id: "7", name: "Alex Johnson", score: 690 },
  { id: "8", name: "Jane Smith", score: 620 },
  { id: "9", name: "Chris Evans", score: 540 },
  { id: "10", name: "Taylor Knox", score: 480 },
];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState("allTime");

  const scores = activeTab === "allTime" ? allTimeScores : dailyScores;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>

      <View style={styles.tabBar}>
        <Pressable
          style={activeTab === "allTime" ? styles.tabActive : styles.tab}
          onPress={() => setActiveTab("allTime")}
        >
          <Text
            style={
              activeTab === "allTime" ? styles.tabTextActive : styles.tabText
            }
          >
            All Time
          </Text>
        </Pressable>
        <Pressable
          style={activeTab === "daily" ? styles.tabActive : styles.tab}
          onPress={() => setActiveTab("daily")}
        >
          <Text
            style={
              activeTab === "daily" ? styles.tabTextActive : styles.tabText
            }
          >
            Daily
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        {scores.map((player, index) => {
          const rank = index + 1;
          let medal = String(rank);
          if (rank === 1) medal = "🥇";
          if (rank === 2) medal = "🥈";
          if (rank === 3) medal = "🥉";

          return (
            <View
              key={player.id}
              style={rank <= 3 ? styles.rowGold : styles.row}
            >
              <Text style={styles.rank}>{medal}</Text>
              <Text style={styles.name}>{player.name}</Text>
              <Text style={styles.score}>{player.score}</Text>
            </View>
          );
        })}
      </ScrollView>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabActive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  tabTextActive: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rowGold: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffbe6",
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f0c040",
  },
  rank: {
    width: 45,
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
