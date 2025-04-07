import { useCursorPosServices } from "@/services/cursorPosServices";
import { cursorPosState } from "@/states/cursorPosState";
import { useSetRecoilState } from "recoil";

export function useMoveCursorLeft() {
    const setCursorPos = useSetRecoilState(cursorPosState);
    const { getLeftCursorPosIfMovable } = useCursorPosServices();
    
    return () => {
        setCursorPos(prev => getLeftCursorPosIfMovable(prev))
    };
}