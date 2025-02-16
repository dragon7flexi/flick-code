import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { isShiftedState } from "@/states/isShiftedState";
import React, { SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

export default function ShiftButton() {
    const setIsShifted: SetterOrUpdater<boolean> = useSetRecoilState(isShiftedState);

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