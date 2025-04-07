import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function useMoveCursorUp() {
    const setCursorPos = useSetRecoilState(cursorPosState);
    const code = useRecoilValue(codeState);
    const { getUpCursorPosIfMovable } = useCursorPosServices();

    return () => {
        setCursorPos((prev) => getUpCursorPosIfMovable(code, prev));
    };
}