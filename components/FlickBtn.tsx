import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeServices";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { isShiftedState } from "@/states/isShiftedState";
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
    upVal: string;
    leftVal: string;
    centerVal: string;
    rightVal: string;
    downVal: string;
}

export default function FlickBtn({
    upVal,
    leftVal,
    centerVal,
    rightVal,
    downVal,
}: Props) {
    const cursorPos: CursorPos = useRecoilValue(cursorPosState);
    const isShifted: boolean = useRecoilValue(isShiftedState);
    const setIsShifted: SetterOrUpdater<boolean> = useSetRecoilState(isShiftedState);

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
            upVal,
            leftVal,
            centerVal,
            rightVal,
            downVal,
        );

        updateCodeAndCursor(currValue, cursorPos);

        if (isShifted) {
            setIsShifted(false);
        }
    };

    // TODO: create a function that returns the panResponder
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: handleRelease,
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.button}>
                <View style={styles.firstLine}>
                    <Text style={styles.buttonText}>{upVal}</Text>
                </View>
                <View style={styles.secondLine}>
                    <Text style={styles.buttonText}>{leftVal}</Text>
                    <Text style={styles.buttonText}>{centerVal}</Text>
                    <Text style={styles.buttonText}>{rightVal}</Text>
                </View>
                <View style={styles.thirdLine}>
                    <Text style={styles.buttonText}>{downVal}</Text>
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
