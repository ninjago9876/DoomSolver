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