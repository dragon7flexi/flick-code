import { CursorPos } from "@/types/cursorPos";

export interface CursorPosServices {
    getUpCursorPosIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getDownCursorPosIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getLeftCursorPosIfMovable: (
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getRightCursorPosIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getNextWordCursorPosIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getPrevWordCursorPosIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
    getFirstCursorPosOfUnderLineIfMovable: (
        code: string[],
        prevCursorPos: CursorPos,
    ) => CursorPos;
}

export function useCursorPosServices(): CursorPosServices {
    const getUpCursorPosIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        // This function calculates the new cursor position when moving up.
        // If movement is not possible, it returns the current position.

        const isCursorAtFirstline: boolean = prevCursorPos.line === 0;
        const canNotMoveUp: boolean = isCursorAtFirstline; // Wrapping the condition for clarity

        // The cursor cannot move up from the first line, so return its current position.
        if (canNotMoveUp) {
            return prevCursorPos;
        }

        const cursorPosOfUpperLine: number = prevCursorPos.line - 1;

        const strLenOfUpperLine: number = code[cursorPosOfUpperLine].length;

        // If the length of the upper line is less than the current cursor column,
        // move the cursor to the end of the upper line. Otherwise, keep the column position.
        const nextCursorPosCol: number = Math.min(
            strLenOfUpperLine,
            prevCursorPos.col,
        );

        const nextCursorPos: CursorPos = {
            line: cursorPosOfUpperLine,
            col: nextCursorPosCol,
        };

        return nextCursorPos;
    };

    const getDownCursorPosIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        const isCursorAtLastLine: boolean = prevCursorPos.line === code.length - 1;
        const canNotMoveDown: boolean = isCursorAtLastLine;

        if (canNotMoveDown) {
            return prevCursorPos;
        }

        const cursorPosOfUnderLine: number = prevCursorPos.line + 1;

        const StrLenOfUnderLine: number = code[cursorPosOfUnderLine].length;

        const nextCursorPosCol: number = Math.min(
            StrLenOfUnderLine,
            prevCursorPos.col,
        );

        const nextCursorPos: CursorPos = {
            line: cursorPosOfUnderLine,
            col: nextCursorPosCol
        };

        return nextCursorPos;
    };

    const getLeftCursorPosIfMovable = (
        prevCursorPos: CursorPos,        
    ): CursorPos => {
        const isCursorAtFirstCol: boolean = prevCursorPos.col === 0;
        const canNotMoveLeft: boolean = isCursorAtFirstCol;

        if (canNotMoveLeft) {
            return prevCursorPos;
        }

        const nextCursorPosCol: number = prevCursorPos.col - 1;

        const nextCursorPos: CursorPos = {
            line: prevCursorPos.line,
            col: nextCursorPosCol,
        }

        return nextCursorPos;
    };

    const getRightCursorPosIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        const targetLine: string = code[prevCursorPos.line];
        const isCursorAtLastCol: boolean = prevCursorPos.col === targetLine.length;
        const canNotMoveRight: boolean = isCursorAtLastCol;

        if (canNotMoveRight) {
            return prevCursorPos;
        }

        const nextCursorPosCol: number = prevCursorPos.col + 1;

        const nextCursorPos: CursorPos = {
            line: prevCursorPos.line,
            col: nextCursorPosCol,
        };

        return nextCursorPos;
    };

    const cursorJumpMilestones: string[] = [
        " ", ",", ")","(", ":", ".",
    ];

    const getNextWordCursorPosIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        const targetLine: string = code[prevCursorPos.line];
        const isCursorAtLastCol: boolean = prevCursorPos.col === targetLine.length;
        const canNotMoveRight: boolean = isCursorAtLastCol;

        if (canNotMoveRight) {
            return prevCursorPos;
        }

        let newCursorPosCol: number | null;

        for (let tmpPos = prevCursorPos.col + 1; tmpPos <= targetLine.length; ++tmpPos) {
            if (cursorJumpMilestones.includes(targetLine[tmpPos])) {
                newCursorPosCol = tmpPos;
                break;
            }

            if (tmpPos === targetLine.length) {
                newCursorPosCol = tmpPos;
                break;
            }
        }

        const newCursorPos: CursorPos = {
            col: newCursorPosCol!,
            line: prevCursorPos.line,
        };

        return newCursorPos;
    };

    const getPrevWordCursorPosIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        const targetLine: string = code[prevCursorPos.line];
        const isCursorAtFirstCol: boolean = prevCursorPos.col === 0;
        const canNotMoveLeft: boolean = isCursorAtFirstCol;

        if (canNotMoveLeft) {
            return prevCursorPos;
        }

        let newCursorPosCol: number | null = null;

        for (let tmpPos = prevCursorPos.col - 2; tmpPos >= 0; --tmpPos) {
            if (cursorJumpMilestones.includes(targetLine[tmpPos])) {
                newCursorPosCol = tmpPos + 1;
                break;
            }
        }

        if (newCursorPosCol === null) {
            newCursorPosCol = 0;
        }

        return {
            col: newCursorPosCol,
            line: prevCursorPos.line,
        };
    };

    const getFirstCursorPosOfUnderLineIfMovable = (
        code: string[],
        prevCursorPos: CursorPos,
    ): CursorPos => {
        const isCursorAtLastLine: boolean = prevCursorPos.line === code.length - 1;
        const canNotMoveToFirstColOfUnderLine: boolean = isCursorAtLastLine;

        if (canNotMoveToFirstColOfUnderLine) {
            return prevCursorPos;
        }

        const newCursorPosCol: number = 0;
        const newCursorPosLine: number = prevCursorPos.line + 1;

        const newCursorPos: CursorPos = {
            col: newCursorPosCol,
            line: newCursorPosLine,
        };

        return newCursorPos;
    };

    const CursorPosServices: CursorPosServices = {
        getUpCursorPosIfMovable,
        getLeftCursorPosIfMovable,
        getRightCursorPosIfMovable,
        getDownCursorPosIfMovable,
        getNextWordCursorPosIfMovable,
        getPrevWordCursorPosIfMovable,
        getFirstCursorPosOfUnderLineIfMovable,
    };

    return CursorPosServices;
}
