import { KEYBOARD_BUTTON_BACKGROUND_COLOR } from "@/constants/Colors";
import { KEYBOARD_BUTTON_HEIGHT, KEYBOARD_BUTTON_WIDTH } from "@/constants/Size";
import { useCodeServices } from "@/services/codeService";
import { cursorPosState } from "@/states/cursorPosState";
import { useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  const { addChar } = useCodeServices();
  // Recoil のフックを直接使って、最新の cursorPos を取得する
  const cursorPos = useRecoilValue(cursorPosState);

  // cursorPos が変化するたびにログ出力する
  useEffect(() => {
    console.log("FlickButton: current cursorPos", cursorPos);
  }, [cursorPos]);

  const handleRelease = (
    e: GestureResponderEvent,
    gesture: PanResponderGestureState
  ) => {
    const { dx, dy } = gesture;
    const threshold = 30;

    // スワイプ量が閾値未満ならセンター（タップ）とみなす
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      console.log("Add char (center):", centerValue, "at", cursorPos);
      addChar(centerValue, cursorPos);
      return;
    }

    // 垂直方向の移動が大きければ上下、そうでなければ左右と判定
    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy < 0) {
        console.log("Add char (up):", upValue, "at", cursorPos);
        addChar(upValue, cursorPos);
      } else {
        console.log("Add char (down):", downValue, "at", cursorPos);
        addChar(downValue, cursorPos);
      }
    } else {
      if (dx < 0) {
        console.log("Add char (left):", leftValue, "at", cursorPos);
        addChar(leftValue, cursorPos);
      } else {
        console.log("Add char (right):", rightValue, "at", cursorPos);
        addChar(rightValue, cursorPos);
      }
    }
  };

  // PanResponder を生成
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: handleRelease,
  });

  return (
    <View style={styles.container}>
      <View style={styles.button} {...panResponder.panHandlers}>
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
