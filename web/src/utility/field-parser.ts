import { Question } from "../types/question";
import { expressionFunctions } from "./question-functions";

export class ExpressionError extends Error {
    failedPart: string;
  
    constructor(message: string, failedPart: string) {
      super(message);
      this.failedPart = failedPart;
      this.name = "ExpressionError";
    }
  }

export function checkParenthesesBalanced(input: string): boolean {
    // Scan through the string
        // If an "(" is found: increment depth by 1
        // If a ")" is found: decrement depth by 1
        // If depth is below zero: return false
    
    // If the depth is zero: return true
    // If not: return false

    let depth = 0
    for (const char of input) {
        if (char === "(") { depth++ }
        if (char === ")") { depth-- }
        if (depth < 0) { return false }
    }
    return depth === 0
}

export function splitFunctionParameters(input: string): string[] {
    // Keep track of a "depth" variable
    // Scan string for every char at index i
        // If an opening parenthese is found: increase "depth" by 1
        // If a closing parenthese is found: decrease "depth" by 1
        // When a comma is found: increment i by one unless "depth" isn't 0.
        // Append the char to the string in the array at index i
        // Repeat until you hit the end
    // Trim every element of the array of leading and trailing whitespace
    // Return the array
    
    let depth = 0
    let index = 0
    const parameters: string[] = []
    for (const char of input) {
        if (char === "(") { depth++ }
        if (char === ")") { depth-- }
        if (char === "," && depth === 0) {
            index++
            parameters[index] = ""
            continue
        }
        if (!parameters[index]) {
            parameters[index] = '';
        }
        parameters[index] += char
    }
    parameters.forEach((parameter, index) => {
        parameters[index] = parameter.trim()
    })
    return parameters
}

export function parseFunctionCall(expression: string, variables: Record<string, string>, processing: Set<string> = new Set()): string {
    // Trim string of leading and trailing whitespace
    // Ensure last character is a ")" if not: throw error

    // Check if the parentheses are balanced with "checkParenthesesBalanced()": if false: throw error

    // Match: 
    // - group 1 for everything before the first parenthese 
    // - group 2 for everything in between first and last parenthese

    // If group 1 is empty: throw error
    // If group 1 contains non alphanumerical characters: throw error

    // Delimit group 2 with "splitFunctionParams()"
    
    // Run parseExpression for every element in the array: if any throws an error: throw an error
    // With the resulting array of parsed expressions:
        // Find the function name (group 1) in "question-functions.ts" inside the "functions" object: if not found: throw error
        // Call the method at that key with the parameters as the array

        // Return the output of the function as a string
    
    const string = expression.trim()
    if (string[string.length - 1] !== ")") { throw new ExpressionError(`Junk at the end of function call: ${expression}`, expression) }
    if (!checkParenthesesBalanced(expression)) { throw new ExpressionError(`Non-balanced parentheses in function call: ${expression}`, expression) }

    const match = expression.match(/(.*?)\((.*)\)/)
    if (!match?.[1]) { throw new ExpressionError(`No function name provided in ${expression}`, expression) }
    if (match[1].match(/[^a-zA-Z0-9-_]/)) { throw new ExpressionError(`Invalid characters found in function call: ${expression}`, expression) }

    const parameters = splitFunctionParameters(match[2])
    const parsedParameters = []
    for (const parameter of parameters) {
        parsedParameters.push(parseExpression(parameter, variables, processing))
    }
    const func = expressionFunctions[match[1]]
    return func(...parsedParameters)
}

export function parseVariableReference(expression: string, variables: Record<string, string>, processing: Set<string> = new Set()): string {
    // If "expression" is contained within processing: throw error
    // If "expression" contains non alphanumerical characters: throw error
    // Index "variables" with the "expression": if not found: throw error
    // Add the variable name to the "processing" set
    // Replace element in variables with the result of parseExpression() on that element
    // Remove the variable name from the "processing" set
    
    // Return the previously found result of parseExpression() as a string

    if (!isNaN(parseFloat(expression))) { return expression }
    if (!isNaN(parseInt(expression))) { return expression }

    if (expression.match(/[^a-zA-Z0-9-_]/)) { throw new ExpressionError(`Invalid characters found in variable usage: ${expression}`, expression) }
    if (processing.has(expression)) {
        throw new ExpressionError(`Cyclic dependency detected in variable: ${expression}`, expression)
    }
    processing.add(expression)
    const newValue = parseExpression(variables[expression], variables, processing)
    processing.delete(expression)
    variables[expression] = newValue
    return newValue
}

export function parseExpression(expression: string, variables: Record<string, string>, processing: Set<string> = new Set()): string {
    // Check for any parentheses
    // If there are any parentheses:
        // It's a function call
        // Call "parseFunctionCall()"
    // If there aren't any parentheses:
        // It's a variable
        // Call "parseVariableReference()"

    try {
        if (expression.match(/[()]/)) {
            return parseFunctionCall(expression, variables, processing)
        } else {
            return parseVariableReference(expression, variables, processing)
        }
    } catch (e) {
        console.error(`Expression: ${expression} failed to parse, error: \n${e}`)
        return "[FAILED]"
    }
}

export function parseGenericText(text: string, variables: Record<string, string>): string {
    return text.replace(/<<(.*?)>>/g, (_match, value) => {
        return parseExpression(value, variables)
    })
}

export function parseQuestion(question: Question): Question {
    const newQuestion = structuredClone(question)
    const variables: Record<string, string> = structuredClone(question.variables)
    if (newQuestion.correctOption === -1) {
        newQuestion.correctOption = Math.floor(Math.random() * 4)
    }
    variables["correct-option"] = newQuestion.correctOption.toString()
    newQuestion.prompt = parseGenericText(question.prompt, variables)
    question.options.forEach((option, index) => {
        newQuestion.options[index] = parseGenericText(option, variables)
    })
    return newQuestion
}