import { DELAY_UNTIL_REPEAT_MS, REPEAT_INTERVAL_MS } from "@/constants/Button";
import { useRef } from "react";

export function useLongPress(callback: () => void) {
  const isPressed = useRef(false);
  const pressTimeout = useRef<NodeJS.Timeout | null>(null);
  const repeatInterval = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    callback(); // First move or action
    isPressed.current = true;

    // Wait until long press
    pressTimeout.current = setTimeout(() => {
      if (!isPressed.current) return; // Don't start repeat

      // Start repeat
      repeatInterval.current = setInterval(() => {
        if (!isPressed.current) return; // Cancel repeat

        callback();
      }, REPEAT_INTERVAL_MS); 
    }, DELAY_UNTIL_REPEAT_MS);
  };

  const handlePressOut = () => {
    isPressed.current = false; // Cancel (or don't start) repeat

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
