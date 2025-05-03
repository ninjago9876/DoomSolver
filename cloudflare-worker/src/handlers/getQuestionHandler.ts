import GetQuestionRequest from "../../../shared/server-io/getQuestion.request"
import GetQuestionResponse from "../../../shared/server-io/getQuestion.response"
import { Question } from "../../../shared/types/question"
import { getQuestion } from "../database"

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
      let requestData: GetQuestionRequest | null
      try {
        requestData = await request.json()
      } catch {
        requestData = null
      }
      
      let question = getQuestion(requestData?.questionID)
      if (!question) { return new Response(`Could not find question with id: ${requestData?.questionID}`) }

      return new Response(JSON.stringify({
        question: { ...question, correctOption: -1 }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
}