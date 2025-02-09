export function canMoveCursorTo(
    code: string[],
    cursorPosCol: number,
    cursorPosLine: number,
): boolean {
    const isCursorPosLineInRange = (): boolean => {
        const lineCnt: number = code.length;

        return (
            0 <= cursorPosLine &&
            cursorPosLine < lineCnt // "less than" is used.
        );
    };

    const isCursorPosColInRange = (): boolean => {
        const targetLine: string = code[cursorPosLine];
        const colCnt: number = targetLine.length;

        return (
            0 <= cursorPosCol &&
            cursorPosCol <= colCnt // "less than or equal to" is used.
        )
    };

    const canMove = (
        isCursorPosLineInRange() &&
        isCursorPosColInRange()
    );

    return canMove;
};