import { KeyActionType } from "./keyActionType";

export interface NormalKey {
    actionType: KeyActionType;
}

export interface FlickKey {
    upVal: string;
    leftVal: string;
    centerVal: string;
    rightVal: string;
    downVal: string;
}

export interface LongPressKey {
    actionType: KeyActionType;
}

export enum KeyType {
    Normal,
    Flick,
    LongPress,
}

export type KeyData = {
    keyType: KeyType.Normal;
    behavior: NormalKey;
} | {
    keyType: KeyType.Flick;
    behavior: FlickKey;
} | {
    keyType: KeyType.LongPress;
    behavior: LongPressKey;
}
