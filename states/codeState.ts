import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "recoil";

const STORAGE_KEY = "codeState";

export const codeState = atom<string[]>({
    key: "codeState",
    default: [""], // Default value if nothing is in storage
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            // Load initial state from AsyncStorage
            (async () => {
                try {
                    const storedCode = await AsyncStorage.getItem(STORAGE_KEY);
                    if (storedCode !== null) {
                        setSelf(JSON.parse(storedCode)); // Set state from storage
                    }
                } catch (error) {
                    console.error("Failed to load codeState from AsyncStorage", error);
                }
            })();

            // Save changes to AsyncStorage whenever state updates
            onSet(async (newValue) => {
                try {
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
                } catch (error) {
                    console.error("Failed to save codeState to AsyncStorage", error);
                }
            });
        },
    ],
});
