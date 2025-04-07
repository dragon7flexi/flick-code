import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useMoveCursorRight() {
    const code = useRecoilValue(codeState);
    const setCursorPos = useSetRecoilState(cursorPosState);
    const { getRightCursorPosIfMovable } = useCursorPosServices();
    
    return () => {
        setCursorPos(prev => getRightCursorPosIfMovable(code, prev))
    };
}