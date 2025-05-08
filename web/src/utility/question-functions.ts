export const expressionFunctions: Record<string, (...params: string[]) => string> = {
    "add": (...params: string[]) => {
        const value = params.reduce((acc, param) => {
            if (isNaN(parseFloat(param))) {
                throw new Error(`${param} is NaN!`)
            }
            return (parseFloat(acc) + parseFloat(param)).toString()
        })
        return value
    },
    "sub": (...params: string[]) => {
        const value = params.reduce((acc, param) => {
            if (isNaN(parseFloat(param))) {
                throw new Error(`${param} is NaN!`)
            }
            return (parseFloat(acc) - parseFloat(param)).toString()
        })
        return value
    },
    "mult": (...params: string[]) => {
        const value = params.reduce((acc, param) => {
            if (isNaN(parseFloat(param))) {
                throw new Error(`${param} is NaN!`)
            }
            return (parseFloat(acc) * parseFloat(param)).toString()
        })
        return value
    },
    "div": (...params: string[]) => {
        const value = params.reduce((acc, param) => {
            if (isNaN(parseFloat(param))) {
                throw new Error(`${param} is NaN!`)
            }
            return (parseFloat(acc) / parseFloat(param)).toString()
        })
        return value
    },
}