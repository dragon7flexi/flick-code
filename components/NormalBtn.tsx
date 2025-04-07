import { useCopyAll } from "@/hooks/key_action/useCopyAll";
import { getBtnTextByKeyActionType, KeyActionType } from "@/key_map/keyActionType";
import { keyboardBtnStyles } from "@/styles/keyboardButtonStyles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    keyAction: () => void;
    btnText: string
}

export default function NormalBtn({
    keyAction,
    btnText,
}: Props) {
    const handlePress = () => {
        keyAction();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.btn}>
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = keyboardBtnStyles;
