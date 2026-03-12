import { StyleSheet, View, Pressable, Image, Modal, ImageBackground, Animated, useAnimatedValue} from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/src/components/themed-text";
import { useEffect, useState } from "react";

export default function ResultsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.navigate("stats")
  }

  const handleRetry = () => {
    navigation.navigate("map")
  }

  const handleShare = () => {
    setModalVisible(true)
  }

  const slideRightAnim = useAnimatedValue(-150)
  const slideLeftAnim = useAnimatedValue(150)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideRightAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }),
      Animated.timing(slideLeftAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
      }),
    ]).start();
  }, []);



  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg" }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.imagesContainer}>

      <Animated.Image
        source={{ uri: "https://images.squarespace-cdn.com/content/v1/5b4dbfd8da02bcfcf39bce03/1710251915806-Z7CK432GWPNKMPPG9OG1/heart4-2022-02-14-at-11.10.03.jpg" }}
        style={[
          styles.userRoute, 
        {transform: [{translateX: slideRightAnim}]},]} />

      <Animated.Image source={require("@/assets/images/red-outline-heart2.jpg")}
        style={[
          styles.targetRoute, 
        {transform: [{translateX: slideLeftAnim}]},]} />

      </View>


      <ThemedText>73% MATCH</ThemedText>
      <ThemedText>2000 POINTS</ThemedText>

      <Pressable
        onPress={() => handleSave()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          styles.saveButton,
        ]}>
        <ThemedText>Save</ThemedText>
      </Pressable>


      <Pressable
        onPress={() => handleRetry()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          styles.retryButton,
        ]}>
        <ThemedText>Retry</ThemedText>
      </Pressable>


      <Pressable
        onPress={() => handleShare()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          styles.shareButton,
        ]}>
        <ThemedText>Share</ThemedText>
      </Pressable>

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <ThemedText>[insert icons]</ThemedText>
            <Pressable
              onPress={() => setModalVisible(false)}>
              <ThemedText>Cancel</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imagesContainer: {
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },

  userRoute: {
    width: 200,
    height: 200,
  },

  targetRoute: {
    width: 200,
    height: 200,
    position: "absolute",
    opacity: 0.5,
  },

  saveButton: {
    backgroundColor: "#84f984",
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#cdcecd",
    textAlign: "center",
  },

  shareButton: {
    backgroundColor: "#5f98f3",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 220,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    marginBottom: 10,
    fontWeight: "900",
    fontSize: 18,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "black",
    width: 150,
  },

  buttonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    shadowOffset: { width: 1, height: 1 },
  }

});
