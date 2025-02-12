import { LINE_NUM_WIDTH } from "@/constants/Size";
import { CursorCoord } from "@/types/cursorCoord";
import { CursorPos } from "@/types/cursorPos";

export function calcCursorTopLeftCoord(
    cursorPos: CursorPos,
    charWidth: number,
    lineHeight: number
): CursorCoord {
    return {
        topLeftX: cursorPos.col * charWidth + LINE_NUM_WIDTH,
        topLeftY: cursorPos.line * lineHeight,
    };
}