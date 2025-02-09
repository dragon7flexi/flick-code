import { useCodeRepo } from "@/repositories/codeRepository";
import { CursorPos } from "@/types/cursorPos";
import { isInRange } from "@/utils/codeServiceUtils";
import { useCursorPosServices } from "./cursorService";
import { useCursorPosRepo } from "@/repositories/cursorRepository";

export interface CodeServices {
    addChar: (
        char: string,
    ) => void;
    delChar: () => void;
}

export function getCodeServices(): CodeServices {
    const { updateCode } = useCodeRepo();
    const { getCursorPos } = useCursorPosRepo();
    const { moveCursorLeft, moveCursorRight } = useCursorPosServices();

    const addChar = (
        char: string,
    ): void => {
        updateCode(
            (
                prevCode: string[]
            ): string[] => { 
                // HACK: updating the cursorPos and the code should be separated.
                const cursorPos: CursorPos = getCursorPos();

                if (!isInRange(prevCode, cursorPos)) {
                    console.error("Invalid cursorPos");

                    return prevCode; // No change.
                }

                const targetLine: string = prevCode[cursorPos.line];

                // HACK: the logic of insertion should be encapsulated.
                const newLine: string = (
                    targetLine.slice(0, cursorPos.col) + 
                    char + 
                    targetLine.slice(cursorPos.col)
                );

                const newCode: string[] = [
                    ...prevCode.slice(0, cursorPos.line),
                    newLine,
                    ...prevCode.slice(cursorPos.line + 1)
                ];

                // HACK: It should be separated from the logic of updating a code.
                moveCursorRight();

                return newCode;
            }
        );
    };

    const delChar = (): void => {
        updateCode(
            (
                prevCode: string[]
            ): string[] => {
                const cursorPos: CursorPos = getCursorPos();

                if (!isInRange(prevCode, cursorPos)) {
                    console.error("Invalid cursorPos");

                    return prevCode; // No change.
                }

                const targetLine: string = prevCode[cursorPos.line];

                const newLine: string = (
                    targetLine.slice(0, cursorPos.col - 1) +
                    targetLine.slice(cursorPos.col)
                );

                const newCode: string[] = [
                    ...prevCode.slice(0, cursorPos.line),
                    newLine,
                    ...prevCode.slice(cursorPos.line + 1)
                ];

                return newCode;
            }
        );

        moveCursorLeft();
    };

    return {
        addChar,
        delChar,
    };
}