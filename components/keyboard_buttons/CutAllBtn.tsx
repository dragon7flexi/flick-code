import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { codeState } from "@/states/codeState";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { copyToClipboard } from "@/utils/clipboardUtils";
import { CursorPos } from "@/types/cursorPos";
import { cursorPosState } from "@/states/cursorPosState";

export default function CutAllButton() {
    const code: string[] = useRecoilValue(codeState);
    const setCode: SetterOrUpdater<string[]> = useSetRecoilState(codeState);
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);

    const handlePress = (): void => {
        const codeStr: string = code.join("\r\n");
        copyToClipboard(codeStr);

        setCode([""]);
        setCursorPos({
            line: 0,
            col: 0,
        });
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
                    CutAll
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