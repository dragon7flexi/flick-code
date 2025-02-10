import { CursorPos } from "@/types/cursorPos";
import { isInRange } from "@/utils/codeServiceUtils";

export interface CodeServices {
  /**
   * 指定した文字を、与えられたカーソル位置に挿入します。
   * @param char 挿入する文字
   * @param cursorPos 挿入位置を示すカーソル情報
   */
  addChar: (char: string, cursorPos: CursorPos) => void;

  /**
   * カーソル位置の1文字前を削除します。
   * @param cursorPos 削除位置を示すカーソル情報
   */
  delChar: (cursorPos: CursorPos) => void;
}

export function useCodeServices(): CodeServices {
  const { updateCode } = useCodeRepo();

  /**
   * 指定した行を更新するヘルパー関数
   */
  const updateLine = (
    prevCode: string[],
    cursorPos: CursorPos,
    lineUpdater: (line: string) => string
  ): string[] => {
    if (!isInRange(prevCode, cursorPos)) {
      console.error("Invalid cursorPos");
      return prevCode;
    }
    const newLine = lineUpdater(prevCode[cursorPos.line]);
    return [
      ...prevCode.slice(0, cursorPos.line),
      newLine,
      ...prevCode.slice(cursorPos.line + 1),
    ];
  };

  const addChar = (char: string, cursorPos: CursorPos): void => {
    console.log("addChar called - Current CursorPos:", cursorPos);

    updateCode((prevCode: string[]): string[] => {
      console.log("Previous Code:", prevCode);

      if (!isInRange(prevCode, cursorPos)) {
        console.error("Invalid cursorPos");
        return prevCode;
      }

      const newCode = updateLine(prevCode, cursorPos, (line) => {
        return line.slice(0, cursorPos.col) + char + line.slice(cursorPos.col);
      });

      console.log("New Code after addChar:", newCode);
      return newCode;
    });
  };

  const delChar = (cursorPos: CursorPos): void => {
    console.log("delChar called - Current CursorPos:", cursorPos);

    updateCode((prevCode: string[]): string[] => {
      console.log("Previous Code:", prevCode);

      if (!isInRange(prevCode, cursorPos)) {
        console.error("Invalid cursorPos");
        return prevCode;
      }

      // 行頭では削除しない（必要に応じた処理を検討）
      if (cursorPos.col <= 0) {
        console.error("Cannot delete character at the beginning of the line");
        return prevCode;
      }

      const newCode = updateLine(prevCode, cursorPos, (line) => {
        return line.slice(0, cursorPos.col - 1) + line.slice(cursorPos.col);
      });

      console.log("New Code after delChar:", newCode);
      return newCode;
    });
  };

  return {
    addChar,
    delChar,
  };
}
