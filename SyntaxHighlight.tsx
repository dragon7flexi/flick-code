import { Text, StyleSheet } from "react-native"
import { CODE_FONT_FAMILY } from "@/constants/FontFamily"
import { CODE_FONT_SIZE } from "@/constants/Size"

const BaseText = ({ style, children }) => <Text style={[styles.baseText, style]}>{children}</Text>

export const NormalText = ({ children }) => <BaseText style={styles.normalText}>{children}</BaseText>
export const KeywordText = ({ children }) => <BaseText style={styles.keywordText}>{children}</BaseText>
export const StringText = ({ children }) => <BaseText style={styles.stringText}>{children}</BaseText>
export const CommentText = ({ children }) => <BaseText style={styles.commentText}>{children}</BaseText>
export const SymbolText = ({ children }) => <BaseText style={styles.symbolText}>{children}</BaseText>

const styles = StyleSheet.create({
  baseText: {
    fontFamily: CODE_FONT_FAMILY,
    fontSize: CODE_FONT_SIZE,
  },
  normalText: {
    color: "white",
  },
  keywordText: {
    color: "#569CD6", // Light blue for keywords
  },
  stringText: {
    color: "#CE9178", // Light red for strings
  },
  commentText: {
    color: "#6A9955", // Green for comments
  },
  symbolText: {
    color: "#D4D4D4", // Light gray for symbols
  },
})

