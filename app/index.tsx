import CharWidthCalculator from '@/components/CharWidthCalculator';
import Code from '@/components/Code';
import Cursor from '@/components/Cursor';
import Keyboard from '@/components/Keyboard';
import { STATUS_BAR_BACKGROUND_COLOR } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { RecoilRoot } from "recoil";

export default function HomeScreen() {
  return (
    <RecoilRoot>
      <View
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={STATUS_BAR_BACKGROUND_COLOR}
        />

        <View
          style={styles.codeContainer}
        >
          <Code />
          
          <Cursor />
        </View>

        <Keyboard />

        <CharWidthCalculator />
      </View>     
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  codeContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "orange",
  },
});
