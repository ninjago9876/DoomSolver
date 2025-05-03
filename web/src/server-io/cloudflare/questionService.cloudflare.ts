import GetQuestionRequest from "../../../../shared/server-io/getQuestion.request";
import GetQuestionResponse from "../../../../shared/server-io/getQuestion.response";
import SubmitAnswerRequest from "../../../../shared/server-io/submitAnswer.request";
import SubmitAnswerResponse from "../../../../shared/server-io/submitAnswer.response";
import { Question } from "../../../../shared/types/question";
import { IQuestionService } from "../IQuestionService"

export class CloudflareQuestionService implements IQuestionService {
    async submitAnswer(request: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
        try {
            const data = await fetch("")
        }
    }
    async getQuestion(request: GetQuestionRequest): Promise<GetQuestionResponse> {
        let questionIndex = 0;
        if (request.questionID != "") {
            questionIndex = questions.findIndex((question: Question) => {
                return question.id == request.questionID;
            })
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    question: questions[questionIndex],
                })
            }, 1000)
        })
    }
}