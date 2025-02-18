const operators: string[] = [".", "=", ":", "*", "+", ",", "-", "/", "%", ";"];
const keywords_blue: string[] = ["def", "in", "const", "function"];
const keywords_green: string[] = ["int", "range"];
const keywords_pink: string[] = ["for", "if", "return"];
const brackets: string[] = ["(", ")", "[", "]", "{", "}"];
const stringDelimiters: string[] = ['"', "'"];  // String literals can use either double or single quotes

function isLetter(char: string): boolean {
    return /^[a-zA-Z_]$/.test(char);
}

function isDigit(char: string): boolean {
    return /^[0-9]$/.test(char);
}

function isOperator(char: string): boolean {
    return operators.includes(char);
}

function isBracket(char: string): boolean {
    return brackets.includes(char);
}

function isStringDelimiter(char: string): boolean {
    return stringDelimiters.includes(char);
}

export interface Token {
    value: string;
    type: string;
    line: number;
    col: number;
    bracketLevel: number;
}

export function tokenizeCode(code: string[]): Token[] {
    let tokens: Token[] = [];
    let bracketStack: string[] = [];
    let bracketLevel: number = 0;

    code.forEach((line, lineNumber) => {
        let i = 0;

        while (i < line.length) {
            let char = line[i];
            let token: Token = { value: "", type: "", line: lineNumber, col: i, bracketLevel: -1 };

            // Handle spaces
            if (char === " ") {
                token.value = " ";
                token.type = "whitespace";
                token.bracketLevel = -1;
                tokens.push(token);
                i++;
                continue;
            }

            // Handle brackets
            if (isBracket(char)) {
                token.value = char;
                if (char === "(" || char === "[" || char === "{") {
                    token.type = "bracket";
                    token.bracketLevel = bracketLevel;
                    tokens.push(token);
                    bracketStack.push(char);
                    bracketLevel++;
                } else {
                    token.type = "bracket";
                    token.bracketLevel = bracketLevel - 1;
                    tokens.push(token);
                    bracketStack.pop();
                    bracketLevel--;
                }
                i++;
                continue;
            }

            // Handle operators
            if (isOperator(char)) {
                token.type = "operator";
                token.value = char;
                token.bracketLevel = -1;
                tokens.push(token);
                i++;
                continue;
            }

            // Handle digits
            if (isDigit(char)) {
                while (i < line.length && isDigit(line[i])) {
                    token.value += line[i];
                    i++;
                }
                token.type = "number";
                token.bracketLevel = -1;
                tokens.push(token);
                continue;
            }

            // Handle string literals
            if (isStringDelimiter(char)) {
                let start = i;
                token.value = char; // Include the opening delimiter
                token.type = "string";
                token.bracketLevel = -1;

                i++; // Move past the opening delimiter
                while (i < line.length && line[i] !== char) {
                    token.value += line[i];
                    i++;
                }

                if (i < line.length && line[i] === char) {
                    token.value += line[i]; // Include the closing delimiter
                    i++; // Move past the closing delimiter
                }

                tokens.push(token);
                continue;
            }

            // Handle comments
            if (line.slice(i, i + 2) === "//") {
                token.value = line.slice(i); // Capture the whole comment
                token.type = "comment";
                token.bracketLevel = -1;
                tokens.push(token);
                break; // No need to process further for single-line comment
            }

            if (line.slice(i, i + 2) === "/*") {
                let start = i;
                token.value = "/*";
                token.type = "comment";
                token.bracketLevel = -1;
                i += 2; // Skip past the opening "/*"

                while (i < line.length && line.slice(i, i + 2) !== "*/") {
                    token.value += line[i];
                    i++;
                }

                if (i < line.length && line.slice(i, i + 2) === "*/") {
                    token.value += "*/"; // Include the closing "*/"
                    i += 2; // Skip past the closing "*/"
                }

                tokens.push(token);
                continue;
            }

            // Handle letters (keywords or identifiers)
            if (isLetter(char)) {
                while (i < line.length && (isLetter(line[i]) || isDigit(line[i]))) {
                    token.value += line[i];
                    i++;
                }

                if (keywords_blue.includes(token.value)) {
                    token.type = "keyword_blue";
                } else if (keywords_green.includes(token.value)) {
                    token.type = "keyword_green";
                } else if (keywords_pink.includes(token.value)) {
                    token.type = "keyword_pink";
                } else {
                    token.type = "identifier";
                }
                token.bracketLevel = -1;
                tokens.push(token);
                continue;
            }

            // Unknown characters
            token.type = "unknown";
            token.value = char;
            token.bracketLevel = -1;
            tokens.push(token);
            i++;
        }
    });

    return tokens;
}
