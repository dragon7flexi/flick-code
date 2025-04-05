import { KeyActionType } from "@/key_map/keyActionType";
import { useCopyAll } from "./key_action/useCopyAll";
import { useCutAll } from "./key_action/useCutAll";
import { useCutLine } from "./key_action/useCutline";

// TODO: complete implementation
const keyActions = {
    [KeyActionType.CopyAll]: useCopyAll,
    [KeyActionType.Config]: () => {},
    [KeyActionType.CutAll]: useCutAll,
    [KeyActionType.CutLine]: useCutLine,
    [KeyActionType.Delete]: () => {},
    [KeyActionType.DeleteTab]: () => {},
    [KeyActionType.End]: () => {},
    [KeyActionType.Enter]: () => {},
    [KeyActionType.Home]: () => {},
    [KeyActionType.MoveCursorUp]: () => {},
    [KeyActionType.MoveCursorDown]: () => {},
    [KeyActionType.MoveCursorLeft]: () => {},
    [KeyActionType.MoveCursorRight]: () => {},
    [KeyActionType.NextWord]: () => {},
    [KeyActionType.Paste]: () => {},
    [KeyActionType.PgDn]: () => {},
    [KeyActionType.PgUp]: () => {},
    [KeyActionType.PrevWord]: () => {},
    [KeyActionType.SetStatusBarColor]: () => {},
    [KeyActionType.Shift]: () => {},
    [KeyActionType.Space]: () => {},
    [KeyActionType.Tab]: () => {},
};

export function useKeyAction(
    keyActionType: KeyActionType
): () => void {
    return keyActions[keyActionType];
}