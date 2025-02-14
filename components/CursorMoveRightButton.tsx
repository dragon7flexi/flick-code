import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";

export default function CursorMoveRightButton() {
    const code: string[] = useRecoilValue(codeState);
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);
    const { getRightCursorPosIfMovable } = useCursorPosServices();

    const handlePress = (): void => {
        setCursorPos(
            (
                prevCursorPos: CursorPos
            ): CursorPos => {
                const newCursorPos: CursorPos = getRightCursorPosIfMovable(
                    code,
                    prevCursorPos,
                );

                return newCursorPos;
            }
        );
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
                    →
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