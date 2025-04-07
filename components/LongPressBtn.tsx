import { useLongPress } from "@/hooks/useLongPress";
import { keyboardBtnStyles } from "@/styles/keyboardButtonStyles";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    keyAction: () => void;
    btnText: string;
}

export default function LongPressBtn({
    keyAction,
    btnText,
}: Props) {
    const { handlePressIn, handlePressOut } = useLongPress(keyAction);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.btn}
            >
                <Text style={styles.btnText}>
                    {btnText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = keyboardBtnStyles;