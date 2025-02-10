import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCursorPosServices } from "@/services/cursorServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorCoord } from "@/types/cursorCoord";
import { CursorPos } from "@/types/cursorPos";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

export default function CursorMoveLeftButton() {
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);
    const { getLeftCursorPosIfMovable } = useCursorPosServices();

    const handlePress = (): void => {
        setCursorPos(
            (
                prevCursorPos: CursorPos,
            ): CursorPos => {
                const nextCursorPos: CursorPos = getLeftCursorPosIfMovable(
                    prevCursorPos,
                );

                return nextCursorPos;
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
                    ←
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