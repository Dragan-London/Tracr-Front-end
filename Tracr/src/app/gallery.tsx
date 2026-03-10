import { View, Text, FlatList, Pressable, Modal, StyleSheet, Image, ImageBackground } from "react-native";
import { useState } from "react";

export default function Shapes() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const shapes = [
    { id: 1, name: "Star", image_url: "https://images.emojiterra.com/google/android-10/512px/2b50.png" },
    { id: 2, name: "Heart", image_url: "https://images.emojiterra.com/google/android-10/512px/2764.png" },
    { id: 3, name: "Fire", image_url: "https://images.emojiterra.com/google/android-11/512px/1f525.png" },
    { id: 4, name: "Flag", image_url: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f6a9.png" },
    { id: 5, name: "Shoe", image_url: "https://images.emojiterra.com/google/android-12l/512px/1f45f.png" },
    { id: 6, name: "Dog", image_url: "https://images.emojiterra.com/google/android-11/512px/1f436.png" },
    { id: 7, name: "Turtle", image_url: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f422.png" },
    { id: 8, name: "Merperson", image_url: "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f9dc_3d.png" }
  ];

  const handleSelection = (shape) => {
    setSelectedShape(shape);
    setModalVisible(true);

  }

  const handleConfirm = (shape) => {

  }

  const bgImage1 = "https://thumbs.dreamstime.com/b/run-icons-seamless-pattern-set-doodle-style-hand-drawing-45599886.jpg?w=768"
  const bgImage2 = "https://thumbs.dreamstime.com/b/hand-draw-kids-doodle-background-objects-child-s-life-hand-draw-kids-doodle-background-objects-child-s-life-158629635.jpg"
  const bgImage3 = "https://img.freepik.com/premium-vector/children-drawings-seamless-pattern-kids-doodle-texture-hand-drawn-cute-house-cat-frog-unicorn-baby-seamless-pattern-editable-stroke-vector-illustration-white-background_192280-1324.jpg"
  
  return (
    <ImageBackground source={{ uri: bgImage1}} resizeMode="cover" imageStyle={{ opacity: 0.05 }} style={styles.backgroundImage}>
      <FlatList
        data={shapes}
        numColumns={3}
        renderItem={({ item }) =>
          <Pressable
            style={styles.card}
            onPress={() => handleSelection(item)}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text>{item.name}</Text>
          </Pressable>

        } />
      <Modal visible={modalVisible} transparent={true} >
        <View style={styles.modalBackground}>

          <View style={styles.modalBox}>
            <Image
              source={{ uri: selectedShape?.image_url }}
              style={styles.modalImage}
            />

            <Text style={styles.modalText}>
              Start this run?
            </Text>

            <Pressable
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Confirm</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
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
    alignItems: "center"
  },

  icon: {
    fontSize: 40
  },

  image: {
    width: 40,
    height: 40,
    marginBottom: 5
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 220
  },

  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 10
  },

  modalText: {
    fontSize: 16,
    marginBottom: 15
  },

  confirmButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }
});