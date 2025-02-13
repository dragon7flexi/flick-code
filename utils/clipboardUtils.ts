import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (
    str: string,
): Promise<void> => {
    await Clipboard.setStringAsync(str);
};

export const fetchCopiedText = async (): Promise<string> => {
    const text: string = await Clipboard.getStringAsync();
    return text;
}