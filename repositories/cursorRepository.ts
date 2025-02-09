import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface CursorPosRepo {
    getCursorPos: () => CursorPos;

    setCursorPos: (
        newCursorPos: CursorPos,
    ) => CursorPos;

    updateCursorPos: (
        updateFn: (
            prevCursorPos: CursorPos,
        ) => CursorPos,
    ) => CursorPos;
}

export function useCursorPosRepo(): CursorPosRepo {
    const cursorPos: CursorPos = useRecoilValue(cursorPosState);
    const setCursorPosHandler: React.Dispatch<SetStateAction<CursorPos>> = useSetRecoilState(cursorPosState);

    const getCursorPos = (): CursorPos => {
        return cursorPos;
    };

    const setCursorPos = (
        newCursorPos: CursorPos,        
    ): CursorPos => {
        setCursorPosHandler(newCursorPos);

        return newCursorPos;
    };

    const updateCursorPos = (
        updateFn: (
            prevCursorPos: CursorPos
        ) => CursorPos,
    ): CursorPos => {
        let newCursorPos: CursorPos | undefined;

        setCursorPosHandler(
            (
                prevCursorPos: CursorPos
            ): CursorPos =>  {
                newCursorPos = updateFn(prevCursorPos);

                return newCursorPos;
            }
        );

        return newCursorPos!;
    };

    const cursorPosRepo: CursorPosRepo = {
        getCursorPos,
        setCursorPos,
        updateCursorPos,
    };

    return cursorPosRepo;
}
