import React, { useEffect } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { STATUS_BAR_BACKGROUND_COLOR } from "@/constants/Colors";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { statusBarColorState } from "@/states/statusBarColorState";
import CharWidthCalculator from "@/components/CharWidthCalculator";
import Code from "@/components/Code";
import Cursor from "@/components/Cursor";
import Keyboard from "@/components/Keyboard";

function HomeScreenContent() {
  const StatusBarColor = useRecoilValue(statusBarColorState);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={StatusBarColor} />
      <View style={styles.codeContainer}>
        <Code />
        <Cursor />
      </View>
      <Keyboard />
      <CharWidthCalculator />
      <View style={styles.back} />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <RecoilRoot>
      <HomeScreenContent />
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -100,
    backgroundColor: STATUS_BAR_BACKGROUND_COLOR,
  },
  container: {
    position: "relative",
    flex: 1,
  },
  codeContainer: {
    flex: 1,
    position: "relative",
  },
});
