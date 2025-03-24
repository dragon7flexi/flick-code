import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCursorPosServices } from "@/services/cursorPosServices";
import { codeState } from "@/states/codeState";
import { cursorPosState } from "@/states/cursorPosState";
import { CursorPos } from "@/types/cursorPos";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { useState, useRef } from "react";
import React from "react";

export default function CursorMoveRightButton() {
    const code: string[] = useRecoilValue(codeState);
    const setCursorPos: SetterOrUpdater<CursorPos> = useSetRecoilState(cursorPosState);
    const { getRightCursorPosIfMovable } = useCursorPosServices();
    const [isLongPress, setIsLongPress] = useState(false);
    const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Handle when the press starts, set a timer for long press detection
    const handlePressIn = () => {
        pressTimerRef.current = setTimeout(() => {
            setIsLongPress(true); // Set flag when long press starts after 100ms
        }, 200); // Trigger long press after 100ms
    };

    // Handle when the press ends, clear the timer if long press is not detected
    const handlePressOut = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current); // Clear timer if press is released
        }
        if (isLongPress) {
            setIsLongPress(false); // Reset flag if long press is canceled
        }
    };

    // Function to move the cursor
    const moveCursor = () => {
        setCursorPos((prevCursorPos: CursorPos): CursorPos => {
            const nextCursorPos: CursorPos = getRightCursorPosIfMovable(
                code,
                prevCursorPos
            );
            return nextCursorPos;
        });
    };

    // Function for a single press (normal tap)
    const handlePress = () => {
        if (!isLongPress) {
            moveCursor(); // Move cursor once on normal tap
        }
    };

    // Function to handle long press behavior (move cursor repeatedly)
    const handleLongPress = () => {
        if (isLongPress) {
            moveCursor(); // Move cursor continuously while long pressing
        }
    };

    // UseEffect to handle long press and move the cursor at regular intervals
    React.useEffect(() => {
        if (isLongPress) {
            const intervalId = setInterval(handleLongPress, 50); // Move cursor every 50ms while long pressed
            return () => clearInterval(intervalId); // Cleanup the interval on long press end
        }
    }, [isLongPress]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
        </View>
    );
}

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
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
    },
});
