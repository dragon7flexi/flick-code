import { CursorCoord } from "@/types/cursorCoord";
import { selector } from "recoil";
import { charWidthState } from "./charWidthState";
import { cursorPosState } from "./cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { LINE_HEIGHT } from "@/constants/Size";

export const cursorCoordState = selector<CursorCoord>({
    key: "cursorCoordState",
    get: ({ get }) => {
        const charWidth: number | null = get(charWidthState);
        const cursorPos: CursorPos = get(cursorPosState);

        if (charWidth === null || charWidth === undefined) {
            console.warn("charWidth is not set yet.");

            return {
                topLeftX: 0,
                topLeftY: 0,
            };
        }

        return {
            topLeftX: cursorPos.col * charWidth,
            topLeftY: cursorPos.line * LINE_HEIGHT,
        };
    },
});
