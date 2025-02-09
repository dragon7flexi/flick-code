import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    upValue: string;
    leftValue: string;
    centerValue: string;
    rightValue: string;
    downValue: string;
}

export function FlickButton({
    upValue,
    leftValue,
    centerValue,
    rightValue,
    downValue,
}: Props) {

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.button}
            >
                <View
                    style={styles.firstLine}
                >
                </View>
                <View
                   style={styles.secondLine}
                >
                </View>
                <View
                    style={styles.thirdLine}
                >
                </View>


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
    firstLine: {
        
    },
    secondLine: {

    },
    thirdLine: {

    },
});