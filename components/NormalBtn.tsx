import { getNormalBtnLogic } from "@/key_map/btnLogics";
import { getBtnTextByKeyActionType, KeyActionType } from "@/key_map/keyActionType";
import { keyboardBtnStyles } from "@/styles/keyboardButtonStyles";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    keyActionType: KeyActionType;
}

export default function NormalBtn({ keyActionType }: Props) {
    const { handlePress } = getNormalBtnLogic(keyActionType);
    const btnText = getBtnTextByKeyActionType(keyActionType);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
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