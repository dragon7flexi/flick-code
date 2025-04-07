import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { isShiftedState } from "@/states/isShiftedState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useEnd() {
    const code = useRecoilValue(codeState);
    const setCursorPos = useSetRecoilState(cursorPosState);
    const setIsShifted = useSetRecoilState(isShiftedState);
    const { getLastCursorPosOfCurrLine } = useCursorPosServices();

    return () => {
        setCursorPos(prev => getLastCursorPosOfCurrLine(code, prev));

        setIsShifted(false);
    };
}
