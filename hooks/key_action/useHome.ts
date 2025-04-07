import { useCursorPosServices } from "@/services/cursorPosServices";
import { cursorPosState } from "@/states/cursorPosState";
import { isShiftedState } from "@/states/isShiftedState";
import { useSetRecoilState } from "recoil";

export function useHome() {
    const setCursorPos = useSetRecoilState(cursorPosState);
    const setIsShifted = useSetRecoilState(isShiftedState);
    const { getFirstCursorPosOfCurrLine } = useCursorPosServices();

    return () => {
        setCursorPos(prev => getFirstCursorPosOfCurrLine(prev));
    
        setIsShifted(false);
    };
}
