import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { codeState } from "@/states/codeState";
import { isShiftedState } from "@/states/isShiftedState";
import { fetchCopiedText } from "@/utils/clipboardUtils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

export default function PasteButton() {
    const setCode: SetterOrUpdater<string[]> = useSetRecoilState(codeState);
    const setIsShifted: SetterOrUpdater<boolean> = useSetRecoilState(isShiftedState);

    const handlePress = async (): Promise<void> => {
        try {
            const copiedText = await fetchCopiedText(); // Get clipboard text
            const codeArray = copiedText.split("\n"); // Convert to array
            setCode(codeArray); // Update Recoil state
        } catch (error) {
            console.error("Failed to paste text from clipboard", error);
        }

        setIsShifted((prev: boolean) => {
            return !prev;
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
                    Paste
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