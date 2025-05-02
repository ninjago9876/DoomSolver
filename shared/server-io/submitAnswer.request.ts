import { Question } from "../types/question";

export default interface SubmitAnswerRequest {
    answeredQuestion: Question;
    chosenOptionIndex: number;
    answerTimeMilliseconds: number;
}