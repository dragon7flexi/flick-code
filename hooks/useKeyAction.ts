import { KeyActionType } from "@/key_map/keyActionType";
import { useCopyAll } from "./key_action/useCopyAll";
import { useCutAll } from "./key_action/useCutAll";
import { useMoveCursorUp } from "./key_action/useMoveCursorUp";
import { useCutLine } from "./key_action/useCutLine";
import { useMoveCursorDown } from "./key_action/useMoveCursorDown";
import { useDeleteChar } from "./key_action/useDeleteChar";
import { useDeleteTab } from "./key_action/useDeleteTab";
import { useEnd } from "./key_action/useEnd";
import { useEnter } from "./key_action/useEnter";
import { useHome } from "./key_action/useHome";
import { useMoveCursorLeft } from "./key_action/useMoveCursorLeft";
import { useMoveCursorRight } from "./key_action/useMoveCursorRight";

export function useKeyActionHooks() {
  const copyAll = useCopyAll();
  const cutAll = useCutAll();
  const cutLine = useCutLine();
  const deleteChar = useDeleteChar();
  const deleteTab = useDeleteTab();
  const end = useEnd();
  const enter = useEnter();
  const home = useHome();
  const moveCursorUp = useMoveCursorUp();
  const moveCursorDown = useMoveCursorDown();
  const moveCursorLeft = useMoveCursorLeft();
  const moveCursorRight = useMoveCursorRight();

  const noop = () => {};

  return {
    [KeyActionType.CopyAll]: copyAll,
    [KeyActionType.Config]: noop,
    [KeyActionType.CutAll]: cutAll,
    [KeyActionType.CutLine]: cutLine,
    [KeyActionType.Delete]: deleteChar,
    [KeyActionType.DeleteTab]: deleteTab,
    [KeyActionType.End]: end,
    [KeyActionType.Enter]: enter,
    [KeyActionType.Home]: home,
    [KeyActionType.MoveCursorUp]: moveCursorUp,
    [KeyActionType.MoveCursorDown]: moveCursorDown,
    [KeyActionType.MoveCursorLeft]: moveCursorLeft,
    [KeyActionType.MoveCursorRight]: moveCursorRight,
    [KeyActionType.NextWord]: noop,
    [KeyActionType.Paste]: noop,
    [KeyActionType.PgDn]: noop,
    [KeyActionType.PgUp]: noop,
    [KeyActionType.PrevWord]: noop,
    [KeyActionType.SetStatusBarColor]: noop,
    [KeyActionType.Shift]: noop,
    [KeyActionType.Space]: noop,
    [KeyActionType.Tab]: noop,
  };
}
