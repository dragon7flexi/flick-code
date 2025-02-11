import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilCallback } from "recoil";

export default function SpaceButton() {
    const { generateCodeAfterCharAddition } = useCodeServices();
    const { getRightCursorPosIfMovable } = useCursorPosServices();

    const updateSpace = useRecoilCallback(
        (
            {
                set,
                snapshot,
            }
        ) => async () => {
            const prevCursorPos: CursorPos = await snapshot.getPromise(
                cursorPosState
            );

            const prevCode: string[] = await snapshot.getPromise(
                codeState
            );

            const whiteSpace: string = " ";

            const newCode: string[] = generateCodeAfterCharAddition(
                prevCode,
                whiteSpace,
                prevCursorPos,
            );

            set(codeState, newCode);

            const newCursorPos: CursorPos = getRightCursorPosIfMovable(
                newCode,
                prevCursorPos,
            );

            set(cursorPosState, newCursorPos);
        },
        [
            generateCodeAfterCharAddition,
            getRightCursorPosIfMovable,
        ]
    );

    const handlePress = (): void => {
        updateSpace();
    };
    
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
                    Space
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