import GetQuestionRequest from "../../../../shared/server-io/getQuestion.request";
import GetQuestionResponse from "../../../../shared/server-io/getQuestion.response";
import SubmitAnswerRequest from "../../../../shared/server-io/submitAnswer.request";
import SubmitAnswerResponse from "../../../../shared/server-io/submitAnswer.response";
import { IQuestionService } from "../IQuestionService"

const CLOUDFLARE_WORKER_URL = "https://doomsolver-worker.ninjago987.workers.dev"


async function postToWorker<T>(path: string, request: object): Promise<T> {
    try {
        const response = await fetch(CLOUDFLARE_WORKER_URL + path, {
            method: "POST",
            body: JSON.stringify(request),
        });
        return response.json()
    } catch {
        return Promise.reject("Failed to connect to worker and parse response correctly")
    }
}

export class CloudflareQuestionService implements IQuestionService {
    async submitAnswer(request: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
        return postToWorker("/submitAnswer", request)
    }

    async getQuestion(request: GetQuestionRequest): Promise<GetQuestionResponse> {
        return postToWorker("/getQuestion", request)
    }
}