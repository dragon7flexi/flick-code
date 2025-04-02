import { STATUS_BAR_BACKGROUND_COLOR } from "@/constants/Colors";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <RecoilRoot>
                <StatusBar
                    backgroundColor={STATUS_BAR_BACKGROUND_COLOR}
                    barStyle={"light-content"}
                />
                <Slot />
            </RecoilRoot>
        </SafeAreaProvider>
    );
}