import { CursorPos } from "@/types/cursorPos";
import { atom, selector } from "recoil";
import { cursorPosState } from "./cursorPosState";
import { codeState } from "./codeState";

export const scrollYState = selector<number>({
    key: "scrollYState",
    get: ({ get }) => {
        const cursorPos: CursorPos = get(cursorPosState);
        const code: string[] = get(codeState);

        const LINE_CNT_IN_SCREEN: number = 14;

        // If a total line count is 15,
        // The maxScrollY is 15 - 14 = 1.
        const maxScrollY = Math.max(
            0,
            code.length - LINE_CNT_IN_SCREEN,
        );

        let scrollY: number = cursorPos.line - Math.floor(LINE_CNT_IN_SCREEN / 2);

        scrollY = Math.max(
            0,
            Math.min(
                scrollY,
                maxScrollY,
            )
        );

        return scrollY
    },
});