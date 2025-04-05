import { codeState } from "@/states/codeState";
import { copyToClipboard } from "@/utils/clipboardUtils";
import { useRecoilValue } from "recoil";

export function useCopyAll() {
    const code: string[] = useRecoilValue(codeState);
    const codeStr: string = code.join("\r\n");
    copyToClipboard(codeStr);
}