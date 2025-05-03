import { getNextQuestion, getQuestion } from "../database"
import SubmitAnswerRequest from "../../../shared/server-io/submitAnswer.request"
import SubmitAnswerResponse from "../../../shared/server-io/submitAnswer.response"
import { Question } from "../../../shared/types/question"

export async function submitAnswerHandler(request: Request): Promise<Response> {
      let requestData: SubmitAnswerRequest
      try {
        requestData = await request.json()
      } catch {
        return new Response("Error while parsing input json!", {status: 404})
      }

      let newQuestion: Question = getNextQuestion(requestData.answeredQuestionID)

      const response: SubmitAnswerResponse = {
        correct: getQuestion(requestData.answeredQuestionID)?.correctOption == requestData.chosenOptionIndex,
        newQuestion: { ...newQuestion, correctOption: -1 }
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
}