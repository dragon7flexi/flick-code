import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { getUpdatedStatesOnEntered } from "@/utils/EnterButtonUtils";
import { useRecoilCallback } from "recoil";

export function useEnter() {
    const { generateCodeAfterLineAddition } = useCodeServices();
    const { getFirstCursorPosOfUnderLineIfMovable } = useCursorPosServices();

    return useRecoilCallback(({ set, snapshot }) => async () => {
            // get previous states
            const prevCursorPos = await snapshot.getPromise(cursorPosState);
            const prevCode = await snapshot.getPromise(codeState);

            // update states
            const { newCode, newCursorPos } = getUpdatedStatesOnEntered(prevCode, prevCursorPos);
            set(codeState, newCode);
            set(cursorPosState, newCursorPos);
        },
        [generateCodeAfterLineAddition,getFirstCursorPosOfUnderLineIfMovable],
    );
}