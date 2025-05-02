import { getQuestionHandler } from "./src/handlers/getQuestionHandler"

export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const path = url.pathname
        const method = request.method.toUpperCase()

        if (path == "/getQuestion" && method == "GET") {
            return getQuestionHandler(request)
        }
        return Promise.reject(`invalid pathname ${path}`);
    }
}