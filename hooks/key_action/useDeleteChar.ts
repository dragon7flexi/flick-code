import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { useRecoilCallback, useRecoilValue } from "recoil";

export function useDeleteChar() {
    const cursorPos = useRecoilValue(cursorPosState);
    const { generateCodeAfterCharDeletion } = useCodeServices();
    const { getLeftCursorPosIfMovable, getFirstCursorPosOfUpperLineIfMovable } = useCursorPosServices();

    return useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const prevCode: string[] = await snapshot.getPromise(codeState);
            let newCode: string[] = [];
            let newCursorPos: CursorPos;

            // TODO: make the code readable
            if (cursorPos.col === 0 && cursorPos.line === 0) {
                return;
            }

            // When the cursor is at the first column, delete the current line and merge it with the previous line
            if (cursorPos.col === 0) {
                // Merge the current line with the previous one
                if (cursorPos.line > 0) {
                    const prevLine: string = prevCode[cursorPos.line - 1];
                    const currLine: string = prevCode[cursorPos.line];
                    const mergedLine: string = prevLine + currLine;

                    newCode = [
                        ...prevCode.slice(0, cursorPos.line - 1),
                        mergedLine,
                        ...prevCode.slice(cursorPos.line + 1),
                    ];

                    // Move the cursor to the end of the merged line
                    newCursorPos = { col: prevLine.length, line: cursorPos.line - 1 };
                }
            } else {
                // Perform regular deletion when cursor is not at the first column
                newCode = generateCodeAfterCharDeletion(prevCode, cursorPos);
                newCursorPos = getLeftCursorPosIfMovable(cursorPos);
            }

            set(codeState, newCode);
            set(cursorPosState, newCursorPos!);
        },
        [generateCodeAfterCharDeletion, getLeftCursorPosIfMovable, getFirstCursorPosOfUpperLineIfMovable, cursorPos]
    );
}