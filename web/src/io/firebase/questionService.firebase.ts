import { Answer } from "../../types/answer";
import { Question } from "../../types/question";
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

export class FirebaseQuestionService implements IQuestionService {
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