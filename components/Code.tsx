import { LINE_CNT_IN_CODE } from "@/constants/Code";
import { CODE_BACKGROUND_COLOR } from "@/constants/Colors";
import { CODE_FONT_FAMILY } from "@/constants/FontFamily";
import { CODE_CONTAINER_HEIGHT, CODE_FONT_SIZE, LINE_HEIGHT, LINE_NUM_WIDTH } from "@/constants/Size";
import { codeState } from "@/states/codeState";
import { scrollYState } from "@/states/scrollYState";
import { Token, tokenizeCode } from "@/utils/tokenizer";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

export default function Code() {
    const code: string[] = useRecoilValue(codeState);
    const scrollY: number = useRecoilValue(scrollYState);

    const tokens: Token[] = tokenizeCode(code);

    const codeInScreen: string[] = code.slice(scrollY, scrollY + LINE_CNT_IN_CODE);

    const getTokenStyle = (token: Token) => {
        let style = {};

        // Color based on bracket level using modulo 3
        const bracketLevelColor = (level: number) => {
            switch (level % 3) {
                case 0:
                    return "yellow";  // Level 1 and 4 (yellow)
                case 1:
                    return "rgb(255, 161, 234)";    // Level 2 (pink)
                case 2:
                    return "rgb(66, 117, 245)";    // Level 3 (blue)
                default:
                    return "green";   // Default fallback
            }
        };

        switch (token.type) {
            case "keyword_blue":
                style = { color: "rgb(66, 147, 245)" };
                break;
            case "keyword_green":
                style = { color: "rgb(133, 240, 127)" };
                break;
            case "keyword_pink":
                style = { color: "rgb(255, 161, 234)" };
                break;
            case "operator":
                style = { color: "rgb(255, 150, 85)" };
                break;
            case "number":
                style = { color: "rgb(221, 247, 190)" };
                break;
            case "identifier":
                style = { color: "rgb(197, 255, 251))" };
                break;
            case "bracket":
                // Adjust color based on bracket level using modulo 3
                style = { color: bracketLevelColor(token.bracketLevel) };
                break;
            case "whitespace":
                style = { color: "transparent" }; // Space is visible, but we don't style it
                break;
            case "string":
                style = { color: "rgb(247, 124, 124)" }; // Apply green color for string literals
                break;
            case "comment":
                style = { color: "gray" }; // Apply gray color for comments
                break;                
            default:
                style = {};
                break;
        }

        return style;
    };

    return (
        <View style={styles.container}>
            {codeInScreen.map((line: string, lineIdx: number) => {
                const lineTokens: Token[] = tokenizeCode([line]);

                return (
                    <View key={lineIdx} style={styles.lineContainer}>
                        <Text style={styles.lineNum}>{lineIdx + 1 + scrollY}</Text>
                        <Text style={styles.line}>
                            {lineTokens.map((token, idx) => (
                                <Text key={idx} style={getTokenStyle(token)}>
                                    {token.type === "whitespace" ? " " : token.value}
                                </Text>
                            ))}
                        </Text>
                    </View>
                );
            })}
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
