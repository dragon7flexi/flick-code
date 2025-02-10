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
            prevTargetLine.slice(cursorPos.col + 1)
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

        const prevTargetLine: string = prevCode[cursorPos.line];

        const newTargetLine: string = (
            prevTargetLine.slice(0, cursorPos.col) +
            prevTargetLine.slice(cursorPos.col + 1)
        );

        const newCode: string[] = [
            ...prevCode.slice(0, cursorPos.line),
            newTargetLine,
            ...prevCode.slice(cursorPos.line + 1),
        ];

        return newCode;
    };

    const codeServices: CodeServices = {
        generateCodeAfterCharAddition,
        generateCodeAfterCharDeletion,
    };

    return codeServices;
}
