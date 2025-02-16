import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { CursorPos } from "@/types/cursorPos";

export interface updatedStatesOnTabButton {
    newCode: string[];
    newCursorPos: CursorPos;
}

export function getUpdatedStatesOnTabButton(
    prevCode: string[],
    prevCursorPos: CursorPos,
): updatedStatesOnTabButton {
    const { generateCodeAfterCharAddition } = useCodeServices();
    const { getRightCursorPosIfMovable } = useCursorPosServices();

    const tabSpace: string = "    ";
    const newCode: string[] = generateCodeAfterCharAddition(prevCode, tabSpace, prevCursorPos);

    const tabLen: number = tabSpace.length;
    let newCursorPos: CursorPos = prevCursorPos;
    for (let i = 0; i < tabLen; ++i) {
        newCursorPos = getRightCursorPosIfMovable(newCode, newCursorPos);
    }

    return {
        newCode,
        newCursorPos,
    };
}