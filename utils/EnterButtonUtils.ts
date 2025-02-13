import { useCodeServices } from "@/services/codeServices";
import { CursorPosServices, useCursorPosServices } from "@/services/cursorPosServices";
import { CursorPos } from "@/types/cursorPos";

export interface UpdatedStatesOnEntered {
    newCode: string[];
    newCursorPos: CursorPos;
}

export function getUpdatedStatesOnEntered(
    prevCode: string[],
    prevCursorPos: CursorPos,
): UpdatedStatesOnEntered {
    const { generateCodeAfterLineAddition, generateCodeAfterCharAddition } = useCodeServices();
    const { getFirstCursorPosOfUnderLineIfMovable, getRightCursorPosIfMovable } = useCursorPosServices();

    // If a current line is indented, add an indent to a next line as well.
    const leadingSpacesCnt: number = countLeadingSpaces(prevCode, prevCursorPos);

    if (isCursorWithinBracket(prevCode, prevCursorPos)) {
        console.log("aaaa")
        let newCode: string[];
        let newCursorPos: CursorPos;

        // Insert a line break
        newCode = generateCodeAfterLineAddition(prevCode, prevCursorPos);
        newCursorPos = getFirstCursorPosOfUnderLineIfMovable(newCode, prevCursorPos);

        // Insert tab spaces
        const tabLen: number = 4;
        const tabSpace: string = " ".repeat(leadingSpacesCnt + tabLen);
        newCode = generateCodeAfterCharAddition(newCode, tabSpace, newCursorPos);
        for (let i = 0; i < tabSpace.length; ++i) {
            newCursorPos = getRightCursorPosIfMovable(newCode, newCursorPos);
        }

        // Insert a line break
        newCode = generateCodeAfterLineAddition(newCode, newCursorPos);

        return {
            newCode,
            newCursorPos,
        };
    }

    let newCode: string[];
    let newCursorPos: CursorPos;

    // Add a line and move the cursor
    newCode = generateCodeAfterLineAddition(prevCode, prevCursorPos);
    newCursorPos = getFirstCursorPosOfUnderLineIfMovable(newCode, prevCursorPos);

    // Add the tabSpace
    const tabSpace: string = " ".repeat(leadingSpacesCnt);
    newCode = generateCodeAfterCharAddition(newCode, tabSpace, newCursorPos);

    // Move the cursor for the amount of the tabspace
    for (let i = 0; i < tabSpace.length; ++i) {
        newCursorPos = getRightCursorPosIfMovable(newCode, newCursorPos);
    }

    return {
        newCode,
        newCursorPos,
    };
}

function isCursorWithinBracket(
    code: string[],
    cursorPos: CursorPos,
): boolean {
    const currLine: string = code[cursorPos.line];

    // Ensure cursor is not at the start or end of the line
    if (cursorPos.col === 0 || cursorPos.col > currLine.length - 1) {
        console.log("Cursor is at the start or too close to the end");
        return false;
    }

    const leftChar: string = currLine[cursorPos.col - 1];
    const rightChar: string = currLine[cursorPos.col];

    console.log(`Checking brackets: leftChar="${leftChar}", rightChar="${rightChar}"`);

    const brackets: string[] = ["()", "{}", "[]"];

    const isWithin = brackets.includes(leftChar + rightChar);
    console.log(`isCursorWithinBracket result: ${isWithin}`);

    return isWithin;
}



function countLeadingSpaces(
    code: string[],
    cursorPos: CursorPos,
): number {
    const currLine: string = code[cursorPos.line];

    let spacesCnt = 0;
    for (const char of currLine) {
        if (char === " ") {
            ++spacesCnt;
        } else {
            break;
        }
    }

    return spacesCnt;
}
