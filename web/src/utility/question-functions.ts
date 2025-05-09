import { randomIntExcluding } from "./random"

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
    "mod": (...params: string[]) => {
        const value = params.reduce((acc, param) => {
            if (isNaN(parseFloat(param))) {
                throw new Error(`${param} is NaN!`)
            }
            return (parseFloat(acc) % parseFloat(param)).toString()
        })
        return value
    },
    "randint": (...params: string[]) => {
        if (params.length !== 2) { throw new Error(`Invalid number of parameters to function randint!`) }
        const min = parseInt(params[0])
        const max = parseInt(params[1])
        if (isNaN(min) || isNaN(max)) { throw new Error(`Invalid parameters to function randint! ${params}`) }
        return Math.floor(Math.random() * (max - min + 1) + min).toString()
    },
    "randint-exclude": (...params: string[]) => {
        if (params.length !== 3) { throw new Error(`Invalid number of parameters to function randint-exclude!`) }
        const min = parseInt(params[0])
        const max = parseInt(params[1])
        const exclude = parseInt(params[2])
        if (isNaN(min) || isNaN(max) || isNaN(exclude)) { throw new Error(`Invalid parameters to function randint-exclude! ${params}`) }
        return randomIntExcluding(min, max, exclude).toString()
    },
    "abs": (...params: string[]) => {
        if (params.length !== 1) { throw new Error(`Invalid number of parameters to function abs!`) }
        const x = parseFloat(params[0])
        if (isNaN(x)) { throw new Error(`Invalid parameters to function abs! ${params}`) }
        return Math.abs(x).toString()
    },
    "mux": (...params: string[]) => {
        if (params.length !== 3) { throw new Error(`Invalid number of parameters to function mux!`) }
        const condition = parseFloat(params[0])
        const isTrue = params[1]
        const isFalse = params[2]
        if (isNaN(condition)) { throw new Error(`Invalid parameters to function mux! ${params}`) }
        return (condition) ? isTrue : isFalse
    },
    "variate-option": (...params: string[]) => {
        if (params.length !== 6) { throw new Error(`Invalid number of parameters to function variate-option!`) }
        const correct = parseFloat(params[0])
        const correctIndex = parseInt(params[1])
        const thisIndex = parseInt(params[2])
        const spread = parseFloat(params[3])
        const decimals = parseInt(params[4])
        const seed = parseInt(params[5])
        if (isNaN(correct) || isNaN(correctIndex) || isNaN(thisIndex) || isNaN(spread) || isNaN(seed)) {
            throw new Error(`Invalid parameters to function randint! ${params}`)
        }

        let value = correct;
        value += (correctIndex - thisIndex) * spread / 2
        return value.toFixed(decimals)
    },
}