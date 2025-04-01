import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCursorPos } from "@/hooks/useCursorPos";
import { useLongPress } from "@/hooks/useLongPress";

export default function CursorMoveUpButton() {
  const { moveUp } = useCursorPos();
  const { handlePressIn, handlePressOut } = useLongPress(moveUp);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.button}>
        <Text style={styles.buttonText}>↑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: KEYBOARD_BUTTON_HEIGHT,
    width: KEYBOARD_BUTTON_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: "90%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: KEYBOARD_BUTTON_BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
