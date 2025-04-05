import { KeyData, KeyType } from "./key";
import { KeyActionType } from "./keyActionType";

export type KeyMap = KeyData[][];

// TODO: create the shiftedKeyMap
export const defaultKeyMap: KeyMap = [
    [ // row: 1
        { // row: 1, col: 1
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Tab,
            },
        },
        { // row: 1, col: 2
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.PrevWord,
            },
        },
        { // row: 1, col: 3
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.CopyAll,
            },
        },
        { // row: 1, col: 4
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.NextWord,
            },
        },
        { // row: 1, col: 5
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.SetStatusBarColor,
            },
        },
    ],
    [ // row: 2
        { // row: 2, col: 1
            keyType: KeyType.LongPress,
            behavior: {
                actionType: KeyActionType.MoveCursorUp
            },
        },
        { // row: 2, col: 2
            keyType: KeyType.Flick,
            behavior: {
                upVal: "_",
                leftVal: "-",
                centerVal: "@",
                rightVal: "/",
                downVal: "1",
            },
        },
        { // row: 2, col: 3
            keyType: KeyType.Flick,
            behavior: {
                upVal: "c",
                leftVal: "b",
                centerVal: "a",
                rightVal: "(",
                downVal: "2",
            },
        },
        { // row: 2, col: 4
            keyType: KeyType.Flick,
            behavior: {
                upVal: "f",
                leftVal: "e",
                centerVal: "d",
                rightVal: ")",
                downVal: "3",
            },
        },
        { // row: 2, col: 5
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Delete,
            },
        },
    ],
    [ // row: 3
        { // row: 3, col: 1
            keyType: KeyType.LongPress,
            behavior: {
                actionType: KeyActionType.MoveCursorLeft,
            },
        },
        { // row: 3, col: 2
            keyType: KeyType.Flick,
            behavior: {
                upVal: "i",
                leftVal: "h",
                centerVal: "g",
                rightVal: "[",
                downVal: "4",
            },
        },
        { // row: 3, col: 3
            keyType: KeyType.Flick,
            behavior: {
                upVal: "l",
                leftVal: "k",
                centerVal: "j",
                rightVal: "]",
                downVal: "5",
            },
        },
        { // row: 3, col: 4
            keyType: KeyType.Flick,
            behavior: {
                upVal: "o",
                leftVal: "n",
                centerVal: "m",
                rightVal: "{",
                downVal: "6",
            },
        },
        { // row: 3, col: 5
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.MoveCursorRight,
            },
        },
    ],
    [ // row: 4
        { // row: 4, col: 1
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.MoveCursorDown,
            },
        },
        { // row: 4, col: 2
            keyType: KeyType.Flick,
            behavior: {
                upVal: "r",
                leftVal: "q",
                centerVal: "p",
                rightVal: "s",
                downVal: "7",
            },
        },
        { // row: 4, col: 3
            keyType: KeyType.Flick,
            behavior: {
                upVal: "v",
                leftVal: "u",
                centerVal: "t",
                rightVal: "}",
                downVal: "8",
            },
        },
        { // row: 4, col: 4
            keyType: KeyType.Flick,
            behavior: {
                upVal: "y",
                leftVal: "x",
                centerVal: "w",
                rightVal: "z",
                downVal: "9",
            },
        },
        { // row: 4, col: 5
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Space,
            },
        },
    ],
    [ // row: 5
        { // row: 5, col: 1
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Config,
            },
        },
        { // row: 5, col: 2
            keyType: KeyType.Flick,
            behavior: {
                upVal: ":",
                leftVal: "=",
                centerVal: ",",
                rightVal: ";",
                downVal: "0",
            },
        },
        { // row: 5, col: 3
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Shift,
            },
        },
        { // row: 5, col: 4
            keyType: KeyType.Flick,
            behavior: {
                upVal: ":",
                leftVal: "=",
                centerVal: ",",
                rightVal: ";",
                downVal: "0",
            },
        },
        { // row: 5, col: 5
            keyType: KeyType.Normal,
            behavior: {
                actionType: KeyActionType.Enter,
            },
        },
    ],
];
