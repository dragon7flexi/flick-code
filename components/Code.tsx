import { LINE_CNT_IN_CODE } from "@/constants/Code";
import { CODE_BACKGROUND_COLOR } from "@/constants/Colors";
import { CODE_FONT_FAMILY } from "@/constants/FontFamily";
import { CODE_CONTAINER_HEIGHT, CODE_FONT_SIZE, LINE_HEIGHT, LINE_NUM_WIDTH } from "@/constants/Size";
import { codeState } from "@/states/codeState";
import { scrollYState } from "@/states/scrollYState";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

export default function Code() {
    const code: string[] = useRecoilValue(codeState);
    const scrollY: number = useRecoilValue(scrollYState);

    const codeInScreen: string[] = code.slice(scrollY, scrollY + LINE_CNT_IN_CODE);

    return (
        <View
            style={styles.container}
        > 
            {codeInScreen.map(
                (
                    line: string, 
                    lineIdx: number,
                ) => (
                <View
                    key={lineIdx}
                    style={styles.lineContainer}
                >
                    <Text
                        style={styles.lineNum}
                    >
                        {lineIdx + 1 + scrollY}
                    </Text>
                    <Text 
                        style={styles.line}
                    >
                        {line}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CODE_BACKGROUND_COLOR,
    },
    lineContainer: {
        flexDirection: "row",
        paddingTop: 10,
        height: LINE_HEIGHT,
    },
    line: {
        color: "white",
        fontSize: CODE_FONT_SIZE,
        fontFamily: CODE_FONT_FAMILY,
    },
    lineNum: {
        color: "rgb(150, 150, 150)",
        fontSize: 15,
        fontFamily: "serif",
        textAlign: "center",
        width: LINE_NUM_WIDTH, 
    },
});