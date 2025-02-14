import { atom } from "recoil";

export enum ProgrammingLang {
    Python,
}

export const programmingLangState = atom<ProgrammingLang>({
    key: "programmingLangState",
    default: ProgrammingLang.Python,
});