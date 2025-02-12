import { CursorPos } from "@/types/cursorPos";
import { isInRange } from "@/utils/codeServiceUtils";

export interface CodeServices {
    generateCodeAfterCharAddition: (
        prevCode: string[],
        char: string,
        cursorPos: CursorPos,
    ) => string[];
    generateCodeAfterCharDeletion: (
        prevCode: string[],
        cursorPos: CursorPos,
    ) => string[];
    generateCodeAfterLineAddition: (
        prevCode: string[],
        cursorPos: CursorPos,
    ) => string[];
}

export function useCodeServices(): CodeServices {
    const generateCodeAfterCharAddition = (
        prevCode: string[],
        char: string,
        cursorPos: CursorPos,
    ): string[] => {
        if (!isInRange(prevCode, cursorPos)) {
            console.error("Invalid cursorPos");

            return prevCode;
        }

        const prevTargetLine: string = prevCode[cursorPos.line];
        
        const newTargetLine: string = (
            prevTargetLine.slice(0, cursorPos.col) +
            char +
            prevTargetLine.slice(cursorPos.col)
        );

        const newCode: string[] = [
            ...prevCode.slice(0, cursorPos.line),
            newTargetLine,
            ...prevCode.slice(cursorPos.line + 1),
        ];

        return newCode;
    };

    const generateCodeAfterCharDeletion = (
        prevCode: string[],
        cursorPos: CursorPos,
    ): string[] => {
        if (
            !isInRange(prevCode, cursorPos) &&
            // TODO:
            // when the delete button is pressed when the cursor is at a first col,
            // delete the current line and move the string of the current line to the end of the previous line.
            cursorPos.col === 0
        ) {
            console.error("Invalid cursorPos");

            return prevCode;
        }

        const prevTargetLine: string = prevCode[cursorPos.line];

        const newTargetLine: string = (
            prevTargetLine.slice(0, cursorPos.col - 1) +
            prevTargetLine.slice(cursorPos.col)
        );

        const newCode: string[] = [
            ...prevCode.slice(0, cursorPos.line),
            newTargetLine,
            ...prevCode.slice(cursorPos.line + 1),
        ];

        return newCode;
    };

    const generateCodeAfterLineAddition = (
        prevCode: string[],
        cursorPos: CursorPos,
    ): string[] => {
        const currLine: string = prevCode[cursorPos.line];
        const beforeCursor: string = currLine.slice(0, cursorPos.col);
        const afterCursor: string = currLine.slice(cursorPos.col);

        const newLines = afterCursor
            ? [beforeCursor, afterCursor]
            : [beforeCursor, ""]

        const newCode: string[] = [
            ...prevCode.slice(0, cursorPos.line),
            ...newLines,
            ...prevCode.slice(cursorPos.line + 1),
        ];

        return newCode;
    };

    const codeServices: CodeServices = {
        generateCodeAfterCharAddition,
        generateCodeAfterCharDeletion,
        generateCodeAfterLineAddition,
    };

    return codeServices;
}
