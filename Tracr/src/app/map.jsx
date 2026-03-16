import LoadingPage from "@/src/components/LoadingPage";
import PopUp from "@/src/components/PopUp";
import { Text } from "@react-navigation/elements";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Polyline } from "react-native-maps";

let start;
let date;

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [trackingStarted, setTrackingStarted] = useState(false);

  const locationRef = useRef(null);
  const mapRef = useRef(null);

  async function watchPosition() {
    if (locationRef.current) return;

    locationRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 3,
        timeInterval: 2000,
      },
      (loc) => {
        setCoords((prev) => [...prev, {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        },
        ]);

        if (mapRef.current) {
          mapRef.current.animateCamera(
            {
              center: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
              },
            },
            { duration: 700 }
          );
        }
      },
    );
  }

  // useEffect(() => setStart(Date.now()), []);

  useEffect(() => {
    async function setUserRegion() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setIsLoading(false);
    }
    setUserRegion();
    // watchPosition();
    // start = Date.now();
    // date = new Date();
    // console.log(`start time: ${start}, today: ${date}`);
  }, []);

  useEffect(() => {
    if (trackingStarted) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          watchPosition();
          setTrackingStarted(true);
          start = Date.now();
          date = new Date();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trackingStarted]);

  const stopWatching = () => {
    if (!locationRef.current) return;

    locationRef.current.remove();
    locationRef.current = null;
    console.log("I've stopped watching and these are my coords>>", coords);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  if (isLoading) return <LoadingPage />;

  // if (region) {
  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        {/* <Marker coordinate={region} title="You are here">
          <Image
            source={require("@/assets/images/letter-A-marker.png")}
            style={styles.marker}
          />
        </Marker> */}
        <Polyline coordinates={coords} strokeColor="#FF4500" strokeWidth={10} />
      </MapView>

      {countdown > 0 && (
        <View style={styles.countdownOverlay}>
          <Text style={styles.countdownText}>{countdown === 1 ? "GO!" : countdown - 1}</Text>
        </View>
      )}

      <PopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        watchPosition={watchPosition}
        stopWatching={stopWatching}
        start={start}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          styles.stopButton,
          styles.buttonText,
        ]}
        onPress={handlePress}
      >
        <Text>STOP</Text>
      </Pressable>
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, height: "100%", width: "100%" },

  countdownOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  countdownText: {
    fontSize: 80,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  loadingImage: {
    resizeMode: "cover",
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: "50%",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  startButton: {
    backgroundColor: "#5CFD5C",
    textAlign: "center",
  },
  stopButton: {
    backgroundColor: "#FF2F2F",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    paddingVertical: 10, // 0.6em ≈ 10px (based on 18px font size)
    paddingHorizontal: 23, // 1.3em ≈ 23px
    marginBottom: 10,
    fontWeight: "900",
    fontSize: 18,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7, // 0.4em ≈ 7px
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 }, // 0.1em ≈ 2px
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2, // Android shadow
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "black",
  },
  buttonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    shadowOffset: { width: 1, height: 1 },
  },
  buttonText: {
    fontFamily: "ui-monospace",
  },
  marker: {
    width: 30,
    height: 30,
  },
});
