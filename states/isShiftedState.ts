import { atom } from "recoil";

export const isShiftedState = atom<boolean>({
    key: "isShiftedState",
    default: false,
});