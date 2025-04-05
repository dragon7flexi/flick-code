import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { copyToClipboard } from "@/utils/clipboardUtils";
import { useRecoilCallback } from "recoil";

export function useCutLine() {
    const { generateCodeAfterLineDeletion } = useCodeServices();
    const { getFirstCursorPosOfUpperLineIfMovable } = useCursorPosServices();

    return useRecoilCallback(
        ({ set, snapshot }) => async () => {
            // get previous states
            const prevCode: string[] = await snapshot.getPromise(codeState);
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);

            // clip the line before deletion
            const currLine: string = prevCode[prevCursorPos.line];
            copyToClipboard(currLine);

            // update states
            const newCode: string[] = generateCodeAfterLineDeletion(prevCode, prevCursorPos);
            set(codeState, newCode);

            const newCursorPos: CursorPos = getFirstCursorPosOfUpperLineIfMovable(newCode, prevCursorPos);
            set(cursorPosState, newCursorPos);
        }
    );
}