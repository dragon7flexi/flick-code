import { ThemeProvider } from "@react-navigation/native";
import React, { useRef } from "react";
import { GestureResponderEvent, PanResponderGestureState, StyleSheet, Text } from "react-native";
import { Animated, Button, PanResponder, TouchableOpacity, View } from "react-native";

interface props {
    upValue: string
    leftValue: string
    centerValue: string
    rightValue: string
    downValue: string
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

function FlickButtonV2({
    upValue,
    leftValue,
    centerValue,
    rightValue,
    downValue,
    setInput
}: props) {
    const handleRelease = (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState
    ) => {
        const { dx, dy } = gesture;

        const threshold = 30;

        if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
            setInput(centerValue);
            return;
        }

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy < 0) {
                setInput(upValue);
                return;
            } else {
                setInput(downValue);
                return;
            }
        } else {
            if (dx < 0) {
                setInput(leftValue);
                return;
            } else {
                setInput(rightValue);
                return;
            }
        }
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease: handleRelease,
        })
    ).current;

    return (
        <View style={styles.container}>
            <View
                {...panResponder.panHandlers}
                style={styles.flickButton}
            >
                <Text
                    style={styles.buttonText}
                >abc2</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flickButton: {
        height: 60,
        width: 60,
        backgroundColor: "rgb(120, 120, 120)",
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: "white",
    }
});

export default FlickButtonV2;