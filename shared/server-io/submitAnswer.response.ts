import { Question } from "../types/question";

export default interface SubmitAnswerResponse {
    newQuestion: Question;
    correct: boolean;
}