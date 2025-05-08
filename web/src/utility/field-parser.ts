import { Question } from "../types/question";

// export function tryEvaluateFunction(expression: string, variables: Record<string, string>) {

// }

export function parseExpression(expression: string, variables: Record<string, string>, processing: Set<string> = new Set()): string {
    return expression.replace(/<<([a-zA-Z0-9_-]+)>>/g, (_, name) => {
        if (!variables[name]) {
            throw new Error(`Undefined variable ${name}`)
        }
        if (processing.has(name)) {
            throw new Error("Cyclic dependency error");
        }
        processing.add(name);
        const evaluatedVariable = parseExpression(variables[name], variables, processing);
        variables[name] = evaluatedVariable;
        processing.delete(name)
        return evaluatedVariable;
    });
}

export function parseQuestion(question: Question): Question {
    const newQuestion = structuredClone(question)
    const variables: Record<string, string> = structuredClone(question.variables)
    variables["correct-option"] = question.correctOption.toString()
    newQuestion.prompt = parseExpression(question.prompt, variables)
    question.options.forEach((option, index) => {
        newQuestion.options[index] = parseExpression(option, variables)
    })
    return newQuestion
}