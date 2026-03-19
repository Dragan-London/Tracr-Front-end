import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { router } from "expo-router"
import { useState } from "react";
import { shapes } from "../../data/shapes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shapes() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelection = (shape) => {
    setSelectedShape(shape);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    router.push({
      pathname: "/map",
      params: {
        shape: JSON.stringify(selectedShape),
      },
    });
  };

  const bgImage1 =
    "https://thumbs.dreamstime.com/b/run-icons-seamless-pattern-set-doodle-style-hand-drawing-45599886.jpg?w=768";
  const bgImage2 =
    "https://thumbs.dreamstime.com/b/hand-draw-kids-doodle-background-objects-child-s-life-hand-draw-kids-doodle-background-objects-child-s-life-158629635.jpg";
  const bgImage3 =
    "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg";

  const imageMap = {
    triangle: require("@/data/images/triangle.png"),
    cross: require("@/data/images/cross.png"),
    zigzag: require("@/data/images/zigzag.png"),
    hexagon: require("@/data/images/hexagon.png"),
    arrow: require("@/data/images/arrow.png"),
    steps: require("@/data/images/steps.png"),
    spiral: require("@/data/images/spiral.png"),
    star: require("@/data/images/star.png"),
    gem: require("@/data/images/gem.png"),
    heart: require("@/data/images/heart.png"),
    lightning: require("@/data/images/lightning.png"),
    butterfly: require("@/data/images/butterfly.png"),
    bear: require("@/data/images/bear.png"),
    airplane: require("@/data/images/airplane.png"),
    house: require("@/data/images/house.png"),
    sailboat: require("@/data/images/sailboat.png"),
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground
      source={{ uri: bgImage3 }}
      resizeMode="cover"
      imageStyle={{ opacity: 0.1 }}
      style={styles.backgroundImage}
    >
      <FlatList
        data={shapes}
        numColumns={3}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 }
              ]}
              onPress={() => handleSelection(item)}
            >
              <Image source={imageMap[item.name]} style={styles.image} />
            </Pressable>
          </View>
        )}
      />
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Image
              source={imageMap[selectedShape?.name]}
              style={styles.modalImage}
            />

            <Text style={styles.modalText}>Start this run?</Text>

            <Pressable
              onPress={() => handleConfirm()}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                styles.startButton,
              ]}
            >
              <Text>Start</Text>
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                styles.cancelButton,
              ]}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 6,
    paddingTop: 60,
    paddingBottom: 12,
  },

  itemWrapper: {
    width: "33.33%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  card: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  icon: {
    fontSize: 40,
  },

  image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
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

  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },

  startButton: {
    backgroundColor: "#5CFD5C",
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: "#cdcecd",
    textAlign: "center",
  },

  button: {
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
});
