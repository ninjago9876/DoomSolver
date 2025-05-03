import { Answer } from "../../types/answer";
import { Question } from "../../types/question";
import { IQuestionService } from "../IQuestionService"

export class IndexedDBQuestionService implements IQuestionService {
    async storeAnswer(answer: Answer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getQuestionAtID(id: string): Promise<Question | undefined> {
        throw new Error("Method not implemented.");
    }
    async findNextQuestion(id: string): Promise<Question> {
        throw new Error("Method not implemented.");
    } 
}