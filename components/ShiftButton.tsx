import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import React, { SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    setIsShifted: React.Dispatch<SetStateAction<boolean>>;
}

export default function ShiftButton({
    setIsShifted
}: Props) {
    const handlePress = (): void => {
        setIsShifted((prev: boolean): boolean => {
            return !prev;
        });
    }

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={handlePress}
                style={styles.button}
            >
                <Text
                    style={styles.buttonText}
                >
                    Shift
                </Text>
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
        color: "white"
    }
});