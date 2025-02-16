import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { CursorPos } from "@/types/cursorPos";

export interface updatedStatesOnDeleteTabButton {
    newCode: string[];
    newCursorPos: CursorPos;
}

export function getUpdatedStatesOnTabDeleteButton(
    prevCode: string[],
    prevCursorPos: CursorPos,
): updatedStatesOnDeleteTabButton {
    const { generateCodeAfterCharDeletion } = useCodeServices();
    const { getLeftCursorPosIfMovable } = useCursorPosServices();

    const targetLine: string = prevCode[prevCursorPos.line];
    if (!targetLine.startsWith(" ")) {
        return {
            newCode: prevCode,
            newCursorPos: prevCursorPos,
        };
    }

    let newCode: string[] = prevCode;
    let newCursorPos: CursorPos = prevCursorPos;

    const tabLen: number = 4;
    for (let i = 0; i < tabLen; ++i) {
        newCode = generateCodeAfterCharDeletion(newCode, newCursorPos);
        newCursorPos = getLeftCursorPosIfMovable(newCursorPos);
    }

    return {
        newCode,
        newCursorPos,
    };
}