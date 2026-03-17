import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/src/contexts/UserContext";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";

const BG_IMAGE = {
  uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg",
};

function getPolylinePoints(svgText) {
  if (typeof svgText !== "string") {
    return null;
  }

  const start = svgText.indexOf('points="');
  if (start === -1) {
    return null;
  }

  const pointsStart = start + 8;
  const pointsEnd = svgText.indexOf('"', pointsStart);
  if (pointsEnd === -1) {
    return null;
  }

  return svgText.slice(pointsStart, pointsEnd);
}

function getExpeditionList(data) {
  if (data && Array.isArray(data.expeditions)) {
    return data.expeditions;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

export default function CollectionScreen() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [expeditions, setExpeditions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = user && user.user_id;

  function handleCardPress(expedition) {
    router.push({
      pathname: "/expedition-detail",
      params: {
        svg: expedition.svg || "",
        title: expedition.title || "Expedition",
        distance: String(expedition.distance || 0),
        accuracy: String(expedition.accuracy || 0),
      },
    });
  }

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function fetchExpeditions() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://tracr-c546.onrender.com/api/users/${userId}/expeditions`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch expeditions");
        }

        setExpeditions(getExpeditionList(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExpeditions();
  }, [userId]);

  function renderCard({ item, index }) {
    const svgText = item && item.svg;
    const points = getPolylinePoints(svgText);

    let title = `Expedition ${index + 1}`;
    if (item && item.title) {
      title = item.title;
    } else if (item && item.name) {
      title = item.name;
    } else if (item && item.expedition_name) {
      title = item.expedition_name;
    }

    let subtitle = "No details available";
    if (item && item.location) {
      subtitle = item.location;
    } else if (item && item.region) {
      subtitle = item.region;
    } else if (item && item.created_at) {
      subtitle = item.created_at;
    }

    return (
      <View style={styles.itemWrapper}>
        <Pressable style={styles.card} onPress={() => handleCardPress(item)}>
          {points ? (
            <View style={styles.svgContainer} pointerEvents="none">
              <Svg
                height="100%"
                width="100%"
                viewBox="0 0 7000 7500"
                pointerEvents="none"
              >
                <Polyline
                  points={points}
                  stroke="red"
                  strokeWidth="180"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={3}>
                {subtitle}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.centeredMessageText}>
          Please log in to view expeditions.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.centeredMessageText}>Loading expeditions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={BG_IMAGE}
      resizeMode="cover"
      imageStyle={styles.backgroundImageStyle}
      style={styles.screen}
    >
      <FlatList
        data={expeditions}
        numColumns={2}
        scrollEnabled
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          if (item && item.id !== undefined && item.id !== null) {
            return String(item.id);
          }

          if (
            item &&
            item.expedition_id !== undefined &&
            item.expedition_id !== null
          ) {
            return String(item.expedition_id);
          }

          return String(index);
        }}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centeredMessageContainer}>
            <Text style={styles.centeredMessageText}>
              No expeditions found.
            </Text>
          </View>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },
  listContent: {
    paddingHorizontal: 6,
    paddingTop: 48,
    paddingBottom: 8,
  },
  itemWrapper: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  card: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    width: "90%",
    height: "90%",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  centeredMessageText: {
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
