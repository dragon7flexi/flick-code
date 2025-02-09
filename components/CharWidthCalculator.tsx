import { CODE_FONT_FAMILY } from "@/constants/FontFamily";
import { CODE_FONT_SIZE } from "@/constants/Size";
import { charWidthState } from "@/states/charWidthState";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { useSetRecoilState } from "recoil";

export default function CharWidthCalculator() {
    const setCharWidth = useSetRecoilState(charWidthState);

    const handleLayout = (evt: LayoutChangeEvent) => {
        const { width } = evt.nativeEvent.layout;
        
        setCharWidth(width);
    };

    return (
        <View
            style={styles.container}
        >
            <Text
                style={{
                    fontSize: CODE_FONT_SIZE,
                    fontFamily: CODE_FONT_FAMILY
                }}
                onLayout={handleLayout}
            >
                A
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        opacity: 0,
    },
});