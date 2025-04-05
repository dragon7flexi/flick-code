export enum KeyActionType {
    CopyAll,
    Config,
    CutAll,
    CutLine,
    Delete,
    DeleteTab,
    End,
    Enter,
    Home,
    MoveCursorUp,
    MoveCursorDown,
    MoveCursorLeft,
    MoveCursorRight,
    NextWord,
    Paste,
    PgDn,
    PgUp,
    PrevWord,
    SetStatusBarColor,
    Shift,
    Space,
    Tab,
}

// String expressions of KeyActionType
const keyActionTypeBtnText = {
    [KeyActionType.CopyAll]: "CpAll",
    [KeyActionType.Config]: "Config",
    [KeyActionType.CutAll]: "CutAll",
    [KeyActionType.CutLine]: "CutLn",
    [KeyActionType.Delete]: "Del",
    [KeyActionType.DeleteTab]: "DelTab",
    [KeyActionType.End]: "End",
    [KeyActionType.Enter]: "Enter",
    [KeyActionType.Home]: "Home",
    [KeyActionType.MoveCursorUp]: "↑",
    [KeyActionType.MoveCursorDown]: "↓",
    [KeyActionType.MoveCursorLeft]: "←",
    [KeyActionType.MoveCursorRight]: "→",
    [KeyActionType.NextWord]: "->>",
    [KeyActionType.Paste]: "Paste",
    [KeyActionType.PgDn]: "PgDn",
    [KeyActionType.PgUp]: "PgUp",
    [KeyActionType.PrevWord]: "<<-",
    [KeyActionType.SetStatusBarColor]: "StatBar",
    [KeyActionType.Shift]: "Shift",
    [KeyActionType.Space]: "Space",
    [KeyActionType.Tab]: "Tab",
};

export function getBtnTextByKeyActionType(keyActionType: KeyActionType): string {
    return keyActionTypeBtnText[keyActionType];
}
