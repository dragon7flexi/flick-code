import { CursorPos } from "@/types/cursorPos";

export interface CursorServices {
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
}

export function useCursorPosServices(): CursorServices {
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

        const cursorPosOfUnderLine: number = prevCursorPos.line - 1;

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

    const cursorServices: CursorServices = {
        getUpCursorPosIfMovable,
        getLeftCursorPosIfMovable,
        getRightCursorPosIfMovable,
        getDownCursorPosIfMovable,
    }

    return cursorServices;
}
