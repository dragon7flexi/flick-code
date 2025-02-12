import { atom } from "recoil";

const initialCode: string[] = [];
for (let i = 0; i < 30; ++i) {
    initialCode.push("console.log('hello world')");
}

const initialCode2: string[] = [
    ""
];

export const codeState = atom<string[]>({
    key: "codeState",
    default: initialCode2,
});