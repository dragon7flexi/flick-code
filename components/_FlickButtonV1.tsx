import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, PanResponder, StyleSheet } from "react-native";

interface FlickButtonProps {
    upperInput: string;
    leftInput: string;
    middleInput: string;
    rightInput: string;
    underInput: string;
}

const FlickButton = ({
    upperInput,
    leftInput,
    middleInput,
    rightInput,
    underInput
}: FlickButtonProps) => {
  const [currInput, setCurrInput] = useState<string>(middleInput);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Log the gesture's current movement (dx, dy)
        const { dx, dy } = gestureState;
        console.log(`onMove, dx: ${dx}, dy: ${dy}`);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        console.log(`onRelease, dx: ${dx}, dy: ${dy}`);

        let newInput = middleInput;

        // Detect horizontal or vertical flicks directly using dx and dy
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal flick (left or right)
            newInput = dx < 0 ? leftInput : rightInput;
            console.log(`Detected horizontal flick: ${newInput}`);
        } else {
            // Vertical flick (up or down)
            newInput = dy < 0 ? upperInput : underInput;
            console.log(`Detected vertical flick: ${newInput}`);
        }

        console.log(`Setting currInput to: ${newInput}`);
        setCurrInput(newInput);
      },
    })
  ).current;

  console.log(`Rendering with currInput: ${currInput}`);

  return (
    <View style={styles.container}>
      <Text style={styles.currInput}>currInput: {currInput}</Text>
      <View {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Flick Me!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  button: { backgroundColor: "blue", padding: 20, borderRadius: 10 },
  buttonText: { color: "white", fontSize: 16 },
  currInput: { color: "white", fontSize: 18, marginBottom: 10 }
});

export default FlickButton;
