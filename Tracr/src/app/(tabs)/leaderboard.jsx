import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";

function getLeaderboardUrl(activeTab) {
  if (activeTab === "daily") {
    return "https://tracr-c546.onrender.com/api/leaderboards?sort_by=accuracy&order=desc&time=day";
  }

  return "https://tracr-c546.onrender.com/api/leaderboards";
}

function getUniqueBestScores(rows) {
  const bestByUser = {};

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];

    if (!row || !row.userId) {
      continue;
    }

    const userId = String(row.userId);

    if (bestByUser[userId] === undefined) {
      bestByUser[userId] = row;
    } else {
      const oldScore = Number(bestByUser[userId].accuracy) || 0;
      const newScore = Number(row.accuracy) || 0;

      if (newScore > oldScore) {
        bestByUser[userId] = row;
      }
    }
  }

  const result = Object.values(bestByUser);

  result.sort(function (a, b) {
    const scoreA = Number(a.accuracy) || 0;
    const scoreB = Number(b.accuracy) || 0;
    return scoreB - scoreA;
  });

  return result;
}

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState("allTime");
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(getLeaderboardUrl(activeTab));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load leaderboard");
        }

        if (data && Array.isArray(data.leaderboard)) {
          setScores(getUniqueBestScores(data.leaderboard));
        } else {
          setScores([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [activeTab]);

  function getPlayerName(player) {
    if (player && player.username) {
      return player.username;
    }

    if (player && player.name) {
      return player.name;
    }

    if (player && player.userId) {
      return `User ${player.userId}`;
    }

    return "Unknown user";
  }

  function getPlayerScore(player) {
    if (player && player.accuracy !== undefined && player.accuracy !== null) {
      return `${player.accuracy}%`;
    }

    return "-";
  }

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
        {isLoading ? (
          <Text style={styles.message}>Loading leaderboard...</Text>
        ) : null}

        {error ? <Text style={styles.message}>{error}</Text> : null}

        {!isLoading && !error && scores.length === 0 ? (
          <Text style={styles.message}>No leaderboard data found.</Text>
        ) : null}

        {scores.map((player, index) => {
          const rank = index + 1;
          let medal = String(rank);
          if (rank === 1) medal = "🥇";
          if (rank === 2) medal = "🥈";
          if (rank === 3) medal = "🥉";

          return (
            <View
              key={String(index)}
              style={rank <= 3 ? styles.rowGold : styles.row}
            >
              <Text style={styles.rank}>{medal}</Text>
              <Text style={styles.name}>{getPlayerName(player)}</Text>
              <Text style={styles.score}>{getPlayerScore(player)}</Text>
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
  message: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    color: "#333",
  },
});
