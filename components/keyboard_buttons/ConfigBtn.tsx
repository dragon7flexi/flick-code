import { keyboardBtnStyles } from "@/styles/keyboardButtonStyles";
import { Text, TouchableOpacity, View } from "react-native";

export default function ConfigBtn() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
            >
                <Text style={styles.btnText}>Config</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = keyboardBtnStyles;