import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";

export default function DeleteButton() {
    const cursorPos: CursorPos = useRecoilValue(cursorPosState);

    const { generateCodeAfterCharDeletion } = useCodeServices();
    const { getLeftCursorPosIfMovable } = useCursorPosServices();

    const updateCodeAndCursor = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const prevCode: string[] = await snapshot.getPromise(codeState);
            const newCode: string[] = generateCodeAfterCharDeletion(
                prevCode,
                cursorPos,
            );
            set(codeState, newCode);
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);
            const newCursorPos: CursorPos = getLeftCursorPosIfMovable(
                prevCursorPos,
            );
            set(cursorPosState, newCursorPos);
        },
        [generateCodeAfterCharDeletion, getLeftCursorPosIfMovable, cursorPos]
    );

    const handlePress = (): void => {
        if (cursorPos.col === 0) {
            return;
        }

        updateCodeAndCursor();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Delete</Text>
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
