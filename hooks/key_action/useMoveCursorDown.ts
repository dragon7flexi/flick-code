import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";

export function useMoveCursorDown() {
    const code = useRecoilValue(codeState);
    const setCursorPos = useSetRecoilState(cursorPosState);

    const { getDownCursorPosIfMovable } = useCursorPosServices();

    return () => {
        setCursorPos((prev) => getDownCursorPosIfMovable(code, prev));
    }
    
}