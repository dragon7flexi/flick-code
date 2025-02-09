import { CursorPos } from "@/types/cursorPos";
import { atom } from "recoil";

export const cursorPosState = atom<CursorPos>({
    key: "cursorPosState",
    default: {
        line: 0,
        col: 0,
    },
});

