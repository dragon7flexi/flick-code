import React, { SetStateAction } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { TabButton } from "./tabButton";
import { KEYBOARD_BACKGROUND_COLOR } from "@/constants/Colors";
// TODO: change the name of cursor buttons
import CursorMoveUpButton from "./CursorMoveUpButton";
import CursorMoveLeftButton from "./CursorMoveLeftButton";
import CursorMoveDownButton from "./CursorMoveDownButton";
import ExitButton from "./ExitButton";
import CursorMoveRightButton from "./CursorMoveRightButton";
import DeleteButton from "./DeleteButton";
import SpaceButton from "./SpaceButton";
import PrevWordButton from "./PrevWordButton";
import NextWordButton from "./NextWordButton";
import PasteButton from "./PasteButton";
import ShiftButton from "./ShiftButton";
import EnterButton from "./EnterButton";
import FlickButton from "./FlickButton";
import SetStatusBarColorButton from "./setStatsuBarColorButton";
import CopyAllButton from "./CopyAllButton";

export default function DefaultKeyLayout() {
    return (
        <View
            style={styles.container}
        >
            {/* 1 */}
            <TabButton />
            <PrevWordButton />
            <CopyAllButton />
            <NextWordButton />
            <SetStatusBarColorButton />

            {/* 2 */}
            <CursorMoveUpButton />
            <FlickButton
                upValue="_"
                leftValue="-"
                centerValue="@"
                rightValue="/"
                downValue="1"
            />
            <FlickButton
                upValue="c"
                leftValue="b"
                centerValue="a"
                rightValue="("
                downValue="2"
            />
            <FlickButton
                upValue="f"
                leftValue="e"
                centerValue="d"
                rightValue=")"
                downValue="3"
            />
            <DeleteButton />
            
            {/* 3 */}
            <CursorMoveLeftButton />
            <FlickButton
                upValue="i"
                leftValue="h"
                centerValue="g"
                rightValue="["
                downValue="4"
            />
            <FlickButton
                upValue="l"
                leftValue="k"
                centerValue="j"
                rightValue="]"
                downValue="5"
            />
            <FlickButton
                upValue="o"
                leftValue="n"
                centerValue="m"
                rightValue="{"
                downValue="6"
            />
            <CursorMoveRightButton />

            {/* 4 */}
            <CursorMoveDownButton />
            <FlickButton
                upValue="r"
                leftValue="q"
                centerValue="p"
                rightValue="s"
                downValue="7"
            />
            <FlickButton
                upValue="v"
                leftValue="u"
                centerValue="t"
                rightValue="}"
                downValue="8"
            />
            <FlickButton
                upValue="y"
                leftValue="x"
                centerValue="w"
                rightValue="z"
                downValue="9"
            />
            <SpaceButton />

            {/* 5 */}
            <SetStatusBarColorButton />
            <FlickButton
                upValue=":"
                leftValue="="
                centerValue=","
                rightValue=";"
                downValue="0"
            />
            <ShiftButton />
            <FlickButton
                upValue='"'
                leftValue="'"
                centerValue="."
                rightValue="!"
                downValue="?"
            />
            <EnterButton />
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