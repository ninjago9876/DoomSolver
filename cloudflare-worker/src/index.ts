import { getQuestionHandler } from "./handlers/getQuestionHandler"
import { submitAnswerHandler } from "./handlers/submitAnswerHandler"

function withCorsHeaders(response: Response): Response {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "Content-Type");
  
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const path = url.pathname
        const method = request.method.toUpperCase()

        if (path == "/getQuestion" && method == "POST") {
            return withCorsHeaders(await getQuestionHandler(request))
        }
        if (path == "/submitAnswer" && method == "POST") {
            return withCorsHeaders(await submitAnswerHandler(request))
        }
        return new Response(`Invalid pathname: ${path}`, { status: 404 });
    }
}