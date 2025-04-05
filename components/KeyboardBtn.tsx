import { KeyData, KeyType } from "@/key_map/key";
import NormalBtn from "./NormalBtn";
import FlickBtn from "./FlickBtn";
import LongPressBtn from "./LongPressBtn";

interface Props {
    keyData: KeyData;
}

export default function KeyboardBtn({ keyData }: Props) {
    switch (keyData.keyType) {
        case KeyType.Normal:
            return (
                <NormalBtn
                    keyActionType={keyData.behavior.actionType}
                />
            );
        case KeyType.Flick:
            return (
                <FlickBtn
                    upVal={keyData.behavior.upVal}
                    leftVal={keyData.behavior.leftVal}
                    centerVal={keyData.behavior.centerVal}
                    rightVal={keyData.behavior.rightVal}
                    downVal={keyData.behavior.downVal}
                />
            );
        case KeyType.LongPress:
            return (
                <LongPressBtn
                    keyActionType={keyData.behavior.actionType}
                />
            );
    }
}
