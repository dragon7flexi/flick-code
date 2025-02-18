import { CursorPos } from "@/types/cursorPos";
import { isInRange } from "@/utils/codeServiceUtils";
import { isCursorWithinBracket } from "@/utils/EnterButtonUtils";

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
    generateCodeAfterLineDeletion: (
        prevCode: string[],
        cursorPos: CursorPos,
    ) => string[]
}

const brackets = ["()", "{}", "[]"];

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

        // auto bracket completion
        // TODO: make explanatory variables
        for (const bracket of brackets) {
            if (char === bracket[0]) {
                char += bracket[1];
            }
        }

        // auto "" completion
        if (char === '"') {
            char += '"';
        }
        
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
        if (!isInRange(prevCode, cursorPos)) {
            console.error("Invalid cursorPos");
            return prevCode;
        }

        // Handle the case where the cursor is at the first column
        if (cursorPos.col === 0 && cursorPos.line > 0) {
            const prevLine: string = prevCode[cursorPos.line - 1];
            const currentLine: string = prevCode[cursorPos.line];

            // Merge the previous line with the current line
            const newLine = prevLine + currentLine;

            const newCode: string[] = [
                ...prevCode.slice(0, cursorPos.line - 1),  // Keep lines before the merged one
                newLine,  // New merged line
                ...prevCode.slice(cursorPos.line + 1),  // Keep lines after the deleted one
            ];

            return newCode;
        }

        if (isCursorWithinBracket(prevCode, cursorPos)) {
            const prevTargetLine: string = prevCode[cursorPos.line];
            const newTargetLine: string = (
                prevTargetLine.slice(0, cursorPos.col - 1) +
                prevTargetLine.slice(cursorPos.col + 1) // delete a behind bracket
            );

            const newCode: string[] = [
                ...prevCode.slice(0, cursorPos.line),
                newTargetLine,
                ...prevCode.slice(cursorPos.line + 1),
            ];

            return newCode;            
        }

        // Standard character deletion logic
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

    const generateCodeAfterLineDeletion = (
        prevCode: string[],
        prevCursorPos: CursorPos,
    ): string[] => {
        if (prevCursorPos.line === 0) {
            return prevCode;
        }

        const newCode: string[] = [
            ...prevCode.slice(0, prevCursorPos.line),
            ...prevCode.slice(prevCursorPos.line + 1),
        ];

        return newCode;
    };

    const codeServices: CodeServices = {
        generateCodeAfterCharAddition,
        generateCodeAfterCharDeletion,
        generateCodeAfterLineAddition,
        generateCodeAfterLineDeletion,
    };

    return codeServices;
}
