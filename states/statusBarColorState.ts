import { STATUS_BAR_BACKGROUND_COLOR } from "@/constants/Colors";
import { atom } from "recoil";

export const statusBarColorState = atom<string>({
    key: "statusBarColorState",
    default: STATUS_BAR_BACKGROUND_COLOR,
});