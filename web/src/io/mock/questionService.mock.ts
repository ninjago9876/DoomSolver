import { randomIntExcluding } from "../../math/random";
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

export class MockQuestionService implements IQuestionService {
    async storeAnswer(answer: Answer): Promise<void> {
        console.log("Pretending to store answer: " + JSON.stringify(answer))
    }
    async getQuestionAtID(id: string): Promise<Question> {
        if (id == "random") { return questions[Math.floor(Math.random() * questions.length) % questions.length] }
        const question: Question | undefined = questions.find((question: Question) => {
            return question.id == id
        })
        if (!question) { return Promise.reject(`No question found with id: ${id}`) }
        return question
    }
    async findNextQuestion(id: string): Promise<Question> {
        return questions[randomIntExcluding(
            questions.length,
            questions.findIndex((question: Question) => {
                return question.id == id
            })
        )]
    }
    
}