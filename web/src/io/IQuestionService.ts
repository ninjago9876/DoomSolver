import { Answer } from "../types/answer";
import { Question } from "../types/question";

export interface IQuestionService {
    storeAnswer(answer: Answer): Promise<void>
    getQuestionAtID(id: string): Promise<Question>
    findNextQuestion(id: string): Promise<Question>
}
