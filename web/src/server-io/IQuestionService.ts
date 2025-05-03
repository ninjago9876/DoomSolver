import SubmitAnswerRequest from "../../../shared/server-io/submitAnswer.request";
import SubmitAnswerResponse from "../../../shared/server-io/submitAnswer.response";

import GetQuestionRequest from "../../../shared/server-io/getQuestion.request";
import GetQuestionResponse from "../../../shared/server-io/getQuestion.response";

export interface IQuestionService {
    submitAnswer(request: SubmitAnswerRequest): Promise<SubmitAnswerResponse>;
    getQuestion(request: GetQuestionRequest): Promise<GetQuestionResponse>;
}
