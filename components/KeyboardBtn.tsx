import { KeyData, KeyType } from "@/key_map/key";
import FlickBtn from "./FlickBtn";
import { getBtnTextByKeyActionType, KeyActionType } from "@/key_map/keyActionType";
import NormalBtn from "./NormalBtn";
import { useKeyActionHooks } from "@/hooks/useKeyAction";
import LongPressBtn from "./LongPressBtn";

interface Props {
    keyData: KeyData;
}

export default function KeyboardBtn({ keyData }: Props) {
    const keyActions = useKeyActionHooks();

    switch (keyData.keyType) {
        case KeyType.Normal:
            return <NormalBtn
                keyAction={keyActions[keyData.behavior.actionType]}
                btnText={
                    getBtnTextByKeyActionType(keyData.behavior.actionType)
                }
            />
        case KeyType.LongPress:
            return <LongPressBtn
                keyAction={keyActions[keyData.behavior.actionType]}
                btnText={
                    getBtnTextByKeyActionType(keyData.behavior.actionType)
                }
            />
        case KeyType.Flick:
            return <FlickBtn
                upVal={keyData.behavior.upVal}
                leftVal={keyData.behavior.leftVal}
                centerVal={keyData.behavior.centerVal}
                rightVal={keyData.behavior.rightVal}
                downVal={keyData.behavior.downVal}
            />
    }
}
