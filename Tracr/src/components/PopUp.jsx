import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { Modal, Pressable, StyleSheet, View } from "react-native";

export default function PopUp({
  modalVisible,
  setModalVisible,
  watchPosition,
  stopWatching,
  start,
  selectedShape
}) {
  function handleResume() {
    watchPosition();
    setModalVisible(!modalVisible);
  }

  function handleFinish() {
    stopWatching();
    setModalVisible(!modalVisible);
    router.push({
      pathname: "/results",
      params: {
        shape: JSON.stringify(selectedShape),
        // runCoords: JSON.stringify(runCoords),
      },
    });
    const timeElapsed = (Date.now() - start) / 1000;
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Continue?</Text>
          <View style={styles.resumeFinishButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                styles.resumeButton,
              ]}
              onPress={handleResume}
            >
              <Text style={styles.textStyle}>Resume</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                styles.finishButton,
                styles.buttonText,
              ]}
              onPress={handleFinish}
            >
              <Text style={styles.textStyle}>Finish</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 7, // 0.4em ≈ 7px
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 }, // 0.1em ≈ 2px
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2, // Android shadow
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
    width: "70%",
    height: "20%",
  },
  resumeButton: {
    backgroundColor: "#5CFD5C",
    textAlign: "center",
  },
  finishButton: {
    backgroundColor: "#FF2F2F",
    textAlign: "center",
  },
  button: {
    bottom: 50,
    alignSelf: "center",
    paddingVertical: 10, // 0.6em ≈ 10px (based on 18px font size)
    paddingHorizontal: 23, // 1.3em ≈ 23px
    // marginBottom: 10,
    margin: 10,
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
    color: "black",
  },
  resumeFinishButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    margin: 5,
    justifyContent: "space-around",
  },
  modalText: {
    marginTop: "15%",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "ui-monospace",
    color: "black",
  },
});
