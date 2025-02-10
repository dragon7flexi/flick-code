import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { determineDirection, FlickDirection, getValueByDirection } from "@/utils/FlickButtonUtils";
import React, { useEffect } from "react";
import {
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";

interface Props {
    upValue: string;
    leftValue: string;
    centerValue: string;
    rightValue: string;
    downValue: string;
}

export function FlickButton({
    upValue,
    leftValue,
    centerValue,
    rightValue,
    downValue,
}: Props) {
    const code: string[] = useRecoilValue(codeState);
    const setCode: SetterOrUpdater<string[]> = useSetRecoilState(codeState);
    const cursorPos: CursorPos = useRecoilValue(cursorPosState);
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);

    const { getRightCursorPosIfMovable } = useCursorPosServices();
    const { generateCodeAfterCharAddition } = useCodeServices();

    const updateCodeAndCursor = useRecoilCallback(
        ({ set, snapshot }) => async (currValue: string, cursorPos: CursorPos) => {
            const prevCode: string[] = await snapshot.getPromise(codeState);
            const newCode: string[] = generateCodeAfterCharAddition(
                prevCode,
                currValue,
                cursorPos,
            );
            set(codeState, newCode);
            const prevCursorPos: CursorPos = await snapshot.getPromise(cursorPosState);
            const newCursorPos: CursorPos = getRightCursorPosIfMovable(
                newCode,
                prevCursorPos,
            );
            set(cursorPosState, newCursorPos);
        },
        [generateCodeAfterCharAddition, getRightCursorPosIfMovable]
    );

    const handleRelease = (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState
    ) => {
        const { dx, dy } = gesture;
        const threshold: number = 30;

        const currDirection: FlickDirection = determineDirection(
            dx,
            dy,
            threshold,
        );

        const currValue: string = getValueByDirection(
            currDirection,
            upValue,
            leftValue,
            centerValue,
            rightValue,
            downValue,
        );

        updateCodeAndCursor(currValue, cursorPos);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: handleRelease,
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.button}>
                <View style={styles.firstLine}>
                    <Text style={styles.buttonText}>{upValue}</Text>
                </View>
                <View style={styles.secondLine}>
                    <Text style={styles.buttonText}>{leftValue}</Text>
                    <Text style={styles.buttonText}>{centerValue}</Text>
                    <Text style={styles.buttonText}>{rightValue}</Text>
                </View>
                <View style={styles.thirdLine}>
                    <Text style={styles.buttonText}>{downValue}</Text>
                </View>
            </View>
        </View>
    );
}

const topAdjustmentValue: number = -5;

const styles = StyleSheet.create({
    container: {
        height: KEYBOARD_BUTTON_HEIGHT,
        width: KEYBOARD_BUTTON_WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        height: "90%",
        width: "90%",
        borderRadius: 10,
        backgroundColor: KEYBOARD_BUTTON_BACKGROUND_COLOR,
        flexDirection: "column",
    },
    buttonText: {
        color: "white",
    },
    firstLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    secondLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        top: topAdjustmentValue,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    thirdLine: {
        width: "100%",
        height: KEYBOARD_BUTTON_HEIGHT / 3,
        top: topAdjustmentValue * 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
});
