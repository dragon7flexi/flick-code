import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { copyToClipboard } from "@/utils/clipboardUtils";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";

export function useCutAll() {
    const code: string[] = useRecoilValue(codeState);
    const setCode: SetterOrUpdater<string[]> = useSetRecoilState(codeState);
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);

    return () => {
        const codeStr: string = code.join("\r\n");
        copyToClipboard(codeStr);

        setCode([""]);
        setCursorPos({
            line: 0,
            col: 0,
        });
    }
}