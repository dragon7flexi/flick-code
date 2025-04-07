import { StyleSheet, View } from "react-native";
import { KEYBOARD_HEIGHT } from "@/constants/Size";
import { useRecoilValue } from "recoil";
import { isShiftedState } from "@/states/isShiftedState";
import { defaultKeyMap } from "@/key_map/defaultKeyMap";
import KeyboardBtn from "./KeyboardBtn";

export default function Keyboard() {
    const isShifted = useRecoilValue(isShiftedState);
    const keyMap = (isShifted ? defaultKeyMap : defaultKeyMap);
    
    return (
        <View style={styles.container}>
            {keyMap.map((keyDataRow, rowIndex) =>
                keyDataRow.map((keyData, keyIndex) => (
                    <KeyboardBtn
                        key={`${rowIndex}-${keyIndex}`}
                        keyData={keyData}
                    />
                ))
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
        flexDirection: "row",
        flexWrap: "wrap",
    },
});