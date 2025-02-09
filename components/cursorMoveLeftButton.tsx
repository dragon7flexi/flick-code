import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCursorPosServices } from "@/services/cursorService";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CursorMoveLeftButton() {
    const { moveCursorLeft } = useCursorPosServices();

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={moveCursorLeft}
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