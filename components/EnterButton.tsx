import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { getUpdatedStatesOnEntered } from "@/utils/EnterButtonUtils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilCallback } from "recoil";

export default function EnterButton() {
    const { generateCodeAfterLineAddition } = useCodeServices();
    const { getFirstCursorPosOfUnderLineIfMovable } = useCursorPosServices();

    const addLine = useRecoilCallback(({ set, snapshot }) => async () => {
            // get previous states
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);
            const prevCode: string[] = await snapshot.getPromise(codeState);

            // update states
            const { newCode, newCursorPos } = getUpdatedStatesOnEntered(prevCode, prevCursorPos);
            set(codeState, newCode);
            set(cursorPosState, newCursorPos);
        },
        [generateCodeAfterLineAddition,getFirstCursorPosOfUnderLineIfMovable],
    );

    const handlePress = (): void => {
        addLine();
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
                    Enter
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