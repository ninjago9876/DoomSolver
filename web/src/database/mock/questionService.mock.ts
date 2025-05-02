import GetQuestionRequest from "../../../../shared/server-io/getQuestion.request";
import GetQuestionResponse from "../../../../shared/server-io/getQuestion.response";
import SubmitAnswerRequest from "../../../../shared/server-io/submitAnswer.request";
import SubmitAnswerResponse from "../../../../shared/server-io/submitAnswer.response";
import { Question } from "../../../../shared/types/question";
import { IQuestionService } from "../IQuestionService"

const questions: Question[] = [
    {
        id: "addition_0",
        prompt: "What is 1 + 1?",
        options: ["1", "5", "3", "2"],
        tags: ["arithmetic", "addition", "easy"],
        correctOption: 3
    },
    {
        id: "addition_1",
        prompt: "What is 10 + 3?",
        options: ["8", "2", "13", "6"],
        tags: ["arithmetic", "addition", "easy"],
        correctOption: 2
    }
]

export class MockQuestionService implements IQuestionService {
    async submitAnswer(request: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
        const questionIndex = questions.findIndex((question: Question) => {
            return question.id == request.answeredQuestion.id;
        })

        return new Promise<SubmitAnswerResponse>((resolve) => {
            setTimeout(() => {
                resolve({
                    newQuestion: questions[questionIndex+1],
                    correct: questions[questionIndex].correctOption == request.chosenOptionIndex
                })
            }, 1000)
        })
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