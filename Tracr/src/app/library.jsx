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

export default function Shapes() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const shapes = [
    {
      id: 1,
      name: "star",
      image_url:
        "https://images.emojiterra.com/google/android-10/512px/2b50.png",
      path: [
      { x: 0.5, y: 0.05 },
      { x: 0.6, y: 0.35 },
      { x: 0.95, y: 0.35 },
      { x: 0.65, y: 0.55 },
      { x: 0.75, y: 0.9 },
      { x: 0.5, y: 0.7 },
      { x: 0.25, y: 0.9 },
      { x: 0.35, y: 0.55 },
      { x: 0.05, y: 0.35 },
      { x: 0.4, y: 0.35 },
      { x: 0.5, y: 0.05 }
    ]
    },
    {
      id: 2,
      name: "heart",
      image_url:
        "https://images.emojiterra.com/google/android-10/512px/2764.png",
        path: [
  { x: 0.50, y: 0.85 },
  { x: 0.38, y: 0.78 },
  { x: 0.27, y: 0.70 },
  { x: 0.20, y: 0.60 },
  { x: 0.18, y: 0.49 },
  { x: 0.19, y: 0.39 },
  { x: 0.24, y: 0.31 },
  { x: 0.31, y: 0.27 },
  { x: 0.39, y: 0.26 },
  { x: 0.445, y: 0.275 },
  { x: 0.47, y: 0.315 },
  { x: 0.50, y: 0.38 },
  { x: 0.53, y: 0.315 },
  { x: 0.555, y: 0.275 },
  { x: 0.61, y: 0.26 },
  { x: 0.69, y: 0.27 },
  { x: 0.76, y: 0.31 },
  { x: 0.81, y: 0.39 },
  { x: 0.82, y: 0.49 },
  { x: 0.80, y: 0.60 },
  { x: 0.73, y: 0.70 },
  { x: 0.62, y: 0.78 },
  { x: 0.50, y: 0.85 },
]
    },
    {
  id: 3,
  name: "Arrow",
  image_url: "https://png.pngtree.com/element_our/sm/20180308/sm_5aa0fdd386c8a.png",
  path: [
    { x: 0.2, y: 0.5 },
    { x: 0.6, y: 0.5 },
    { x: 0.6, y: 0.3 },
    { x: 0.9, y: 0.6 },
    { x: 0.6, y: 0.9 },
    { x: 0.6, y: 0.7 },
    { x: 0.2, y: 0.7 },
    { x: 0.2, y: 0.5 }
  ]
},
{
  id: 4,
  name: "Lightning Bolt",
  image_url: "https://images.emojiterra.com/google/android-11/256px/26a1.png",
  path: [
    { x: 0.5, y: 0.1 },
    { x: 0.3, y: 0.5 },
    { x: 0.55, y: 0.5 },
    { x: 0.35, y: 0.9 },
    { x: 0.7, y: 0.4 },
    { x: 0.45, y: 0.4 },
    { x: 0.5, y: 0.1 }
  ]
},
{
  id: 5,
  name: "Gem",
  image_url: "https://em-content.zobj.net/thumbs/160/apple/354/gem-stone_1f48e.png",
  path: [
  { x: 0.15, y: 0.40 },
  { x: 0.35, y: 0.20 },
  { x: 0.65, y: 0.20 },
  { x: 0.85, y: 0.40 },
  { x: 0.50, y: 0.85 },
  { x: 0.15, y: 0.40 }
]
}
    // {
    //   id: 3,
    //   name: "Fire",
    //   image_url:
    //     "https://images.emojiterra.com/google/android-11/512px/1f525.png",
    // },
    // {
    //   id: 4,
    //   name: "Flag",
    //   image_url:
    //     "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f6a9.png",
    // },
    // {
    //   id: 5,
    //   name: "Shoe",
    //   image_url:
    //     "https://images.emojiterra.com/google/android-12l/512px/1f45f.png",
    // },
    // {
    //   id: 6,
    //   name: "Dog",
    //   image_url:
    //     "https://images.emojiterra.com/google/android-11/512px/1f436.png",
    // },
    // {
    //   id: 7,
    //   name: "Turtle",
    //   image_url:
    //     "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f422.png",
    // },
    // {
    //   id: 8,
    //   name: "Merperson",
    //   image_url:
    //     "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f9dc_3d.png",
    // },
  ];

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

  return (
    <ImageBackground
      source={{ uri: bgImage3 }}
      resizeMode="cover"
      imageStyle={{ opacity: 0.1 }}
      style={styles.backgroundImage}
    >
      <FlatList
        data={shapes}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handleSelection(item)}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
          </Pressable>
        )}
      />
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Image
              source={{ uri: selectedShape?.image_url }}
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
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  card: {
    flex: 1,
    margin: 10,
    height: 90,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 40,
  },

  image: {
    width: 40,
    height: 40,
    marginBottom: 5,
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
