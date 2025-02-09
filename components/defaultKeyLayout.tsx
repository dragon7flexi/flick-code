import React, { SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { TabButton } from "./tabButton";
import { KEYBOARD_BACKGROUND_COLOR } from "@/constants/Colors";
// TODO: change the name of cursor buttons
import CursorMoveUpButton from "./cursorMoveUpButton";
import CursorMoveLeftButton from "./cursorMoveLeftButton";
import CursorMoveDownButton from "./cursorMoveDownButton";
import ExitButton from "./ExitButton";
import { FlickButton } from "./FlickButton";
import CursorMoveRightButton from "./CursorMoveRightButton";

interface Props {
    setIsShifted: React.Dispatch<SetStateAction<boolean>>;
}

export default function DefaultKeyLayout({
    setIsShifted,
}: Props) {

    return (
        <View
            style={styles.container}
        >
            {/* 1 */}
            <TabButton />
            <CursorMoveUpButton />
            <CursorMoveLeftButton />
            <CursorMoveDownButton />
            <ExitButton />

            {/* 2 */}
            <CursorMoveUpButton />
            <FlickButton
                upValue="_"
                leftValue="-"
                centerValue="@"
                rightValue="/"
                downValue="1"
            />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            
            {/* 3 */}
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveRightButton />

            {/* 4 */}
            <CursorMoveDownButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />

            {/* 5 */}
            <ExitButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
            <CursorMoveLeftButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: KEYBOARD_BACKGROUND_COLOR,
        flexWrap: "wrap",
        flexDirection: "row",
    }
});