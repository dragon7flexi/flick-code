import { getLongPressBtnLogic } from "@/key_map/btnLogics";
import { getBtnTextByKeyActionType, KeyActionType } from "@/key_map/keyActionType";
import { keyboardBtnStyles } from "@/styles/keyboardButtonStyles";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    keyActionType: KeyActionType;
}

export default function LongPressBtn({ keyActionType }: Props) {
    const { handlePressIn, handlePressOut } = getLongPressBtnLogic(keyActionType);
    const btnText = getBtnTextByKeyActionType(keyActionType);

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