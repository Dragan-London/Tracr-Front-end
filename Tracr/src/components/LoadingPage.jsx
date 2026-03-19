import React, { useRef, useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View, Animated, Easing } from "react-native";


export default function LoadingOverlay({ visible }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const backgroundImage = "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fchildren-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 500, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ])
      ).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.loadingOverlay}>
      <ImageBackground source={{ uri: backgroundImage }} resizeMode="cover" style={styles.backgroundImage} />

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.shadow, {
          opacity: bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.1] }),
          transform: [{ scaleX: bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [1.2, 0.5] }) }]
        }]} />

        <Animated.View style={{ transform: [{ translateY: bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -40] }) }] }}>
          <Image style={styles.loadingImage} source={require("@/assets/images/A-Tracr-logo.png")} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    
  },
  backgroundImage: { ...StyleSheet.absoluteFillObject, opacity: 0.08 },
  container: { alignItems: "center", justifyContent: "center" },
  loadingImage: { width: 100, height: 100, resizeMode: "contain" },
  shadow: { position: "absolute", bottom: -10, width: 60, height: 10, backgroundColor: "black", borderRadius: 30 },
});