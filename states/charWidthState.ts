import { atom } from "recoil";

export const charWidthState = atom<number | null>({
    key: "charWidthState",
    default: null,
});