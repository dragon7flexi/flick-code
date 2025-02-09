import { LINE_NUM_WIDTH } from "@/constants/Size";
import { CursorCoord, CursorPos } from "@/types/cursor";

export function calcCursorTopLeftCoord(
    cursorPos: CursorPos,
    charWidth: number,
    lineHeight: number
): CursorCoord {
    return {
        x: cursorPos.col * charWidth + LINE_NUM_WIDTH,
        y: cursorPos.line * lineHeight
    }
}