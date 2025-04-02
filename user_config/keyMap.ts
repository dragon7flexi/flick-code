export enum KeyActions {
    CopyAll,
    CutAll,
    CutLine,
    Delete,
    DeleteTab,
    End,
    Enter,
    Home,
    NextWord,
    Paste,
    PgDn,
    PgUp,
    PrevWord,
    SetStatusBarColor, // HACK: fix the bug that the status bar becomes white.
    Shift,
    Space,
    Tab,
}

export interface NormalKey {
    Action: KeyActions
}

export interface FlickKey {
    upVal: string
    leftVal: string
    CenterVal: string
    RightVal: string
    DownVal: string
}

export interface LongPressKey {
    Action: KeyActions
}

// TODO: keymap should be customize by user config
const keyMap = {
};

export function getKeyMap() {

}