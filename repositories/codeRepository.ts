import { useRecoilValue, useSetRecoilState } from "recoil";
import { codeState } from "@/states/codeState";

interface CodeRepo {
    getCode: () => string[];
    setCode: (newCode: string[]) => string[];
    updateCode: (updateFn: (prevCode: string[]) => string[]) => string[];
}

export function useCodeRepo(): CodeRepo {
    const code = useRecoilValue(codeState);
    const setCodeHandler = useSetRecoilState(codeState);

    const getCode = (): string[] => {
        return code;
    };

    const setCode = (newCode: string[]): string[] => {
        setCodeHandler(newCode);
        return newCode;
    };

    const updateCode = (updateFn: (prevCode: string[]) => string[]): string[] => {
        let newCode: string[] | undefined;

        setCodeHandler((prevCode) => {
            newCode = updateFn(prevCode);
            return newCode;
        });

        return newCode!;
    };

    return { getCode, setCode, updateCode };
}
