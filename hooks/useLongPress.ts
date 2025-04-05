import { DELAY_UNTIL_REPEAT_MS, REPEAT_INTERVAL_MS } from "@/constants/Button";
import { LongPressBtnLogic } from "@/key_map/btnLogics";
import { useRef } from "react";

export function useLongPress(
  keyAction: () => void
): LongPressBtnLogic {
  const isPressed = useRef(false);
  const pressTimeout = useRef<NodeJS.Timeout | null>(null);
  const repeatInterval = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    keyAction(); // First actionType
    isPressed.current = true;

    // Wait until long press
    pressTimeout.current = setTimeout(() => {
      if (!isPressed.current) return; // Don't start repeat

      // Start repeat
      repeatInterval.current = setInterval(() => {
        if (!isPressed.current) return; // Stop repeat

        keyAction();
      }, REPEAT_INTERVAL_MS); 
    }, DELAY_UNTIL_REPEAT_MS);
  };

  const handlePressOut = () => {
    isPressed.current = false; // Stop (or don't start) repeat

    // Reset timeout and interval
    if (pressTimeout.current) {
      clearTimeout(pressTimeout.current);
      pressTimeout.current = null;
    }
    if (repeatInterval.current) {
      clearInterval(repeatInterval.current);
      repeatInterval.current = null;
    }
  };

  return {
    handlePressIn,
    handlePressOut,
  };
}
