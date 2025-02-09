import { SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KEYBOARD_HEIGHT } from "@/constants/Size";
import DefaultKeyLayout from "./defaultKeyLayout";
import ShiftedKeyLayout from "./shiftedKeyLayout";

export default function Keyboard() {
    const [isShifted, setIsShifted] = useState<boolean>(false);

    return (
        <View
            style={styles.container}
        >
            {isShifted ? (
                <ShiftedKeyLayout />
            ) : (
                <DefaultKeyLayout
                    setIsShifted={setIsShifted}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        height: KEYBOARD_HEIGHT,
        width: "100%",
        zIndex: 1,
        backgroundColor: "rgb(40, 40, 40)",
        flexWrap: "wrap",
    },
});