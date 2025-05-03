import { getQuestionHandler } from "./handlers/getQuestionHandler"
import { submitAnswerHandler } from "./handlers/submitAnswerHandler"

export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const path = url.pathname
        const method = request.method.toUpperCase()

        if (path == "/getQuestion" && method == "POST") {
            return getQuestionHandler(request)
        }
        if (path == "/submitAnswer" && method == "POST") {
            return submitAnswerHandler(request)
        }
        return new Response(`Invalid pathname: ${path}`, { status: 404 });
    }
}