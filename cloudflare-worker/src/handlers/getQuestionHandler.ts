import GetQuestionRequest from "../../../shared/server-io/getQuestion.request"
import GetQuestionResponse from "../../../shared/server-io/getQuestion.response"
import SubmitAnswerRequest from "../../../shared/server-io/submitAnswer.request"
import SubmitAnswerResponse from "../../../shared/server-io/submitAnswer.response"
import { Question } from "../../../shared/types/question"

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

export async function getQuestionHandler(request: Request): Promise<Response> {
      let requestData: GetQuestionRequest = {
        questionID: ""
      }
      let parsedData: GetQuestionRequest
      try {
        parsedData = await request.json()
      } catch {
        parsedData = {
          questionID: ""
        }
      }
      requestData = parsedData

      let question = questions.find((question: Question) => {
        return question.id == requestData.questionID
      })
      if (requestData.questionID == "") {
        question = questions[0]
      }
      if (!question) {
        return new Response(`Could not find question with id: ${requestData.questionID}`)
      }
      const redactedQuestion = { ...question, correctOption: 0 }
      const response: GetQuestionResponse = {
        question: redactedQuestion
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
}