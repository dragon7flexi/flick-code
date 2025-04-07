import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { copyToClipboard } from "@/utils/clipboardUtils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilCallback } from "recoil";

export default function CutLineButton() {
    const { generateCodeAfterLineDeletion } = useCodeServices();
    const { getFirstCursorPosOfUpperLineIfMovable } = useCursorPosServices();

    const updateCodeAndCursor = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            // get previous states
            const prevCode: string[] = await snapshot.getPromise(codeState);
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);

            // clip the line before deletion
            const currLine: string = prevCode[prevCursorPos.line];
            copyToClipboard(currLine);

            // update states
            const newCode: string[] = generateCodeAfterLineDeletion(prevCode, prevCursorPos);
            set(codeState, newCode);

            const newCursorPos: CursorPos = getFirstCursorPosOfUpperLineIfMovable(newCode, prevCursorPos);
            set(cursorPosState, newCursorPos);
        }
    )

    const handlePress = (): void => {
        updateCodeAndCursor();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>CutLine</Text>
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
