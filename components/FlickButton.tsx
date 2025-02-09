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
                    <Text
                        style={styles.buttonText}
                    >
                        {upValue}
                    </Text>
                </View>

                <View
                   style={styles.secondLine}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        {leftValue}
                    </Text>
                    <Text
                        style={styles.buttonText}
                    >
                        {centerValue}
                    </Text>
                    <Text
                        style={styles.buttonText}
                    >
                        {rightValue}
                    </Text>
                </View>

                <View
                    style={styles.thirdLine}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        {downValue}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const topAdjustmentValue: number = -5;

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
        flexDirection: "column",
    },
    buttonText: {
        color: "white",
    },
    firstLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    secondLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        top: topAdjustmentValue,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    thirdLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        top: topAdjustmentValue * 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
});