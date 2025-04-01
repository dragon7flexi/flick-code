import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState"
import { Code } from "@/types/code";
import { CursorPos } from "@/types/cursorPos"
import { useRecoilState } from "recoil"

export const useCursorPos = () => {
    const [cursorPos, setCursorPos] = useRecoilState<CursorPos>(cursorPosState);
    const [code, setCode] = useRecoilState<Code>(codeState);

    return {
        moveUp: () => {
            const { getUpCursorPosIfMovable } = useCursorPosServices();

            setCursorPos((prev) => getUpCursorPosIfMovable(code, prev));
        },
    };
};