import { KEYBOARD_BACKGROUND_COLOR } from "@/constants/Colors";
import { SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { TabButton } from "./tabButton";
import PrevWordButton from "./PrevWordButton";
import CutAllButton from "./CutAllButton";
import NextWordButton from "./NextWordButton";
import PasteButton from "./PasteButton";
import CursorMoveUpButton from "./CursorMoveUpButton";
import FlickButton from "./FlickButton";
import DeleteButton from "./DeleteButton";
import CursorMoveLeftButton from "./CursorMoveLeftButton";
import CursorMoveRightButton from "./CursorMoveRightButton";
import CursorMoveDownButton from "./CursorMoveDownButton";
import SpaceButton from "./SpaceButton";
import ExitButton from "./ExitButton";
import ShiftButton from "./ShiftButton";
import EnterButton from "./EnterButton";

interface Props {
    setIsShifted: React.Dispatch<SetStateAction<boolean>>;
}

export default function ShiftedKeyLayout({
    setIsShifted,
}: Props) {
    return (
        <View
            style={styles.container}
        >
            {/* 1 */}
            <TabButton />
            <PrevWordButton />
            <CutAllButton />
            <NextWordButton />
            <PasteButton />

            {/* 2 */}
            <CursorMoveUpButton />
            <FlickButton
                upValue="_"
                leftValue="-"
                centerValue="\"
                rightValue="/"
                downValue="1"
            />
            <FlickButton
                upValue="C"
                leftValue="B"
                centerValue="A"
                rightValue="("
                downValue="2"
            />
            <FlickButton
                upValue="F"
                leftValue="E"
                centerValue="D"
                rightValue=")"
                downValue="3"
            />
            <DeleteButton />

            {/* 2 */}
            <CursorMoveLeftButton />
            <FlickButton
                upValue="I"
                leftValue="H"
                centerValue="G"
                rightValue="["
                downValue="4"
            />
            <FlickButton
                upValue="L"
                leftValue="K"
                centerValue="J"
                rightValue="]"
                downValue="5"
            />
            <FlickButton
                upValue="O"
                leftValue="N"
                centerValue="M"
                rightValue="{"
                downValue="6"
            />
            <CursorMoveRightButton />

            {/* 3 */}
            <CursorMoveDownButton />
            <FlickButton
                upValue="R"
                leftValue="Q"
                centerValue="P"
                rightValue="S"
                downValue="7"
            />
            <FlickButton
                upValue="V"
                leftValue="U"
                centerValue="T"
                rightValue="}"
                downValue="8"
            />
            <FlickButton
                upValue="Y"
                leftValue="X"
                centerValue="W"
                rightValue="Z"
                downValue="9"
            />
            <SpaceButton />

            {/* 5 */}
            <ExitButton />
            <FlickButton
                upValue="$"
                leftValue="`"
                centerValue="&"
                rightValue="|"
                downValue="#"
            />
            <ShiftButton
                setIsShifted={setIsShifted}
            />
            <FlickButton
                upValue="*"
                leftValue="<"
                centerValue="+"
                rightValue=">"
                downValue="%"
            />
            <EnterButton />

        </View>
    );
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