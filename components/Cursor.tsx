import { LINE_HEIGHT, LINE_NUM_WIDTH } from "@/constants/Size";
import { cursorCoordState } from "@/states/cursorCoordState";
import { CursorCoord } from "@/types/cursorCoord";
import { View } from "react-native";
import { useRecoilValue } from "recoil";

export default function Cursor() {
    const cursorCoord: CursorCoord = useRecoilValue(cursorCoordState);

    return (
        <View
            style={{
                position: "absolute",
                top: cursorCoord.topLeftY,
                left: cursorCoord.topLeftX + LINE_NUM_WIDTH,
                width: 2,
                height: LINE_HEIGHT,
                backgroundColor: "white",
                opacity: 0.7,
            }}
        />
    );
}