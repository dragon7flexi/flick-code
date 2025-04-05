import { useKeyAction } from "@/hooks/useKeyAction";
import { KeyActionType } from "./keyActionType";
import { useLongPress } from "@/hooks/useLongPress";

interface NormalBtnLogic {
    handlePress: () => void;
}

export function getNormalBtnLogic(
    keyActionType: KeyActionType,
): NormalBtnLogic {
    return {
        handlePress: useKeyAction(keyActionType),
    }; 
}

export interface LongPressBtnLogic {
    handlePressIn: () => void;
    handlePressOut: () => void;
}

export function getLongPressBtnLogic(
    keyActionType: KeyActionType,
): LongPressBtnLogic {
    return useLongPress(
        useKeyAction(keyActionType),
    );
}