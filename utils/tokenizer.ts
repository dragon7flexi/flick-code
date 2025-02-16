const keywords = [
  "function",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "return",
  "class",
  "import",
  "export",
]
const symbols = ["=", ":", "(", ")", "{", "}", "[", "]", "+", "-", "*", "/", "<", ">", "==", "!=", "<=", ">=", ";", ","]

type TokenType = "keyword" | "string" | "comment" | "symbol" | "normal"

interface Token {
  type: TokenType
  value: string
}

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let current = 0

  while (current < code.length) {
    let char = code[current]

    // Handle whitespace
    if (/\s/.test(char)) {
      let value = ""
      while (/\s/.test(char)) {
        value += char
        char = code[++current]
      }
      tokens.push({ type: "normal", value })
      continue
    }

    // Handle comments
    if (char === "/" && code[current + 1] === "/") {
      let value = ""
      while (char !== "\n" && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({ type: "comment", value })
      continue
    }

    // Handle strings
    if (char === '"' || char === "'") {
      const quote = char
      let value = char
      char = code[++current]
      while (char !== quote && current < code.length) {
        value += char
        char = code[++current]
      }
      value += char
      tokens.push({ type: "string", value })
      current++
      continue
    }

    // Handle keywords and identifiers
    if (/[a-zA-Z_]/.test(char)) {
      let value = ""
      while (/[a-zA-Z0-9_]/.test(char)) {
        value += char
        char = code[++current]
      }
      const type = keywords.includes(value) ? "keyword" : "normal"
      tokens.push({ type, value })
      continue
    }

    // Handle symbols
    if (symbols.some((symbol) => code.startsWith(symbol, current))) {
      const symbol = symbols.find((symbol) => code.startsWith(symbol, current))!
      tokens.push({ type: "symbol", value: symbol })
      current += symbol.length
      continue
    }

    // Handle numbers and other characters
    tokens.push({ type: "normal", value: char })
    current++
  }

  return tokens
}

