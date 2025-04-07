import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { getUpdatedStatesOnTabDeleteButton } from "@/utils/DeleteTabButtonUtils";
import { useRecoilCallback } from "recoil";

export function useDeleteTab() {
    return useRecoilCallback(({ set, snapshot }) => async () => {
            // get previous states
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);
            const prevCode: string[] = await snapshot.getPromise(codeState);

            // update states
            const { newCode, newCursorPos } = getUpdatedStatesOnTabDeleteButton(prevCode, prevCursorPos);
            set(codeState, newCode);
            set(cursorPosState, newCursorPos);
        },
        [],
    );
}
