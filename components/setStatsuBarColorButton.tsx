import { KEYBOARD_BUTTON_BACKGROUND_COLOR, STATUS_BAR_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { statusBarColorState } from "@/states/statusBarColorState";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

export default function SetStatusBarColorButton() {
    const setStatusBarColor: SetterOrUpdater<string> = useSetRecoilState(statusBarColorState);
    
    const handlePress = (): void => {
        setStatusBarColor(STATUS_BAR_BACKGROUND_COLOR);
        setTimeout(() => {
            StatusBar.setBackgroundColor(STATUS_BAR_BACKGROUND_COLOR);
        }, 100); // Small delay to ensure state is updated
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
                    StatBar
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