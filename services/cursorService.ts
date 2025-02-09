import { useCodeRepo } from "@/repositories/codeRepository";
import { useCursorPosRepo } from "@/repositories/cursorRepository";
import { CursorPos } from "@/types/cursorPos";

export interface CursorServices {
    moveCursorUp: () => void;
    moveCursorDown: () => void;
    moveCursorLeft: () => void;
    moveCursorRight: () => void;
}

export function useCursorPosServices(): CursorServices {
    const { updateCursorPos } = useCursorPosRepo();
    const { getCode } = useCodeRepo(); // HACK: the code should be passed as an argument in each functions.

    const moveCursorUp = (
    ): void => {
        updateCursorPos(
            (
                prevCursorPos: CursorPos
            ): CursorPos => {
                const canNotMoveUp: boolean = prevCursorPos.line === 0;
                
                if (canNotMoveUp) {
                    return prevCursorPos;
                }

                const code: string[] = getCode();

                const upperLineStrLen = code[prevCursorPos.line - 1].length;

                const newCursorPosCol: number = Math.min(
                    upperLineStrLen,
                    prevCursorPos.col,
                );

                const newCursorPosLine: number = prevCursorPos.line - 1;

                const newCursorPos: CursorPos = {
                    line: newCursorPosLine,
                    col: newCursorPosCol,
                };

                return newCursorPos;
            }
        );
    };

    const moveCursorDown = (): void => {
        updateCursorPos(
            (
                prevCursorPos: CursorPos
            ): CursorPos => {
                const code: string[] = getCode();

                const canNotMoveDown: boolean = prevCursorPos.line === code.length - 1;

                if (canNotMoveDown) {
                    return prevCursorPos;
                }

                const underLineStrLen: number = code[prevCursorPos.line + 1].length;

                const newCursorPosCol: number = Math.min(
                    underLineStrLen,
                    prevCursorPos.col,
                );

                const newCursorPosLine: number = prevCursorPos.line + 1;

                const newCursorPos: CursorPos = {
                    line: newCursorPosLine,
                    col: newCursorPosCol,
                };

                return newCursorPos;
            }
        );
    };

    const moveCursorLeft = (): void => {
        updateCursorPos(
            (
                prevCursorPos: CursorPos
            ): CursorPos => {
                const canNotMoveLeft: boolean = prevCursorPos.col === 0;

                if (canNotMoveLeft) {
                    return prevCursorPos;
                }

                const newCursorPos: CursorPos = {
                    line: prevCursorPos.line,
                    col: prevCursorPos.col - 1
                };

                return newCursorPos;
            }
        );
    };

    const moveCursorRight = (): void => {
        updateCursorPos(
            (
                prevCursorPos: CursorPos
            ): CursorPos => {
                const code: string[] = getCode();

                const targetLine: string = code[prevCursorPos.line];

                const canNotMoveRight: boolean = prevCursorPos.col === targetLine.length;

                if (canNotMoveRight) {
                    return prevCursorPos;
                }

                const newCursorPos: CursorPos = {
                    line: prevCursorPos.line,
                    col: prevCursorPos.col + 1
                };

                return newCursorPos;
            }
        );
    };

    const cursorServices: CursorServices = {
        moveCursorUp,
        moveCursorDown,
        moveCursorLeft,
        moveCursorRight
    };

    return cursorServices;
}