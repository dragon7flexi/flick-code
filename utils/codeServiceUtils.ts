import { CursorPos } from "@/types/cursorPos";

export function isInRange(
    code: string[],
    cursorPos: CursorPos
): boolean {
    return (
        0 <= cursorPos.line && 
        cursorPos.line <= code.length &&
        0 <= cursorPos.col &&
        cursorPos.col <= code[cursorPos.line].length
    );
}
