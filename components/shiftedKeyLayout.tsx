import { KEYBOARD_BACKGROUND_COLOR } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import PasteButton from "./PasteButton";
import FlickButton from "./FlickButton";
import DeleteButton from "./DeleteButton";
import SpaceButton from "./SpaceButton";
import ShiftButton from "./ShiftButton";
import EnterButton from "./EnterButton";
import CutLineButton from "./CutLineButton";
import LineJumpButton from "./LineJumpButton";
import WordJumpButton from "./WordJumpButton";
import SetStatusBarColorButton from "./setStatsuBarColorButton";
import { DeleteTabButton } from "./DeleteTabButton";
import HomeButton from "./HomeButton";
import EndButton from "./EndButton";
import PgUpButton from "./PgUpButton";
import PgDnButton from "./PgDnButton";

export default function ShiftedKeyLayout() {
    return (
        <View
            style={styles.container}
        >
            {/* 1 */}
            <DeleteTabButton />
            <LineJumpButton />
            <CutLineButton />
            <WordJumpButton />
            <PasteButton />

            {/* 2 */}
            <PgUpButton />
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

            {/* 3 */}
            <HomeButton />
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
            <EndButton />

            {/* 4 */}
            <PgDnButton />
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
            <SetStatusBarColorButton />
            <FlickButton
                upValue="$"
                leftValue="`"
                centerValue="&"
                rightValue="|"
                downValue="#"
            />
            <ShiftButton />
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