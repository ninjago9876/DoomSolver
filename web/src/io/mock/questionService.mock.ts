import { randomIntExcluding } from "../../utility/random";
import { Answer } from "../../types/answer";
import { Question } from "../../types/question";
import { IQuestionService } from "../IQuestionService"
import { parseQuestion } from "../../utility/field-parser";

const questions: Question[] = [
    {
        variables: {
            "term1": "1",
            "term2": "2"
        },
        id: "addition_0",
        prompt: "What is <<term1>> + <<term2>>?",
        options: ["1", "5", "10", "3"],
        tags: ["arithmetic", "addition", "easy"],
        correctOption: 3
    },
    {
        variables: {
            "term1": "10",
            "term2": "3"
        },
        id: "addition_1",
        prompt: "What is <<term1>> + <<term2>>?",
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
        if (id == "random") { id = questions[Math.floor(Math.random() * questions.length)].id }
        let question: Question | undefined = structuredClone(questions.find((question: Question) => {
            return question.id == id
        }))
        if (!question) {
            throw new Error(`Question at ID: ${id} not found!`)
        }
        question = parseQuestion(question)
        if (!question) throw new Error(`No question found with id: ${id}`);

        return question
    }
    async findNextQuestion(id: string): Promise<Question> {
        return this.getQuestionAtID(questions[randomIntExcluding(
            questions.length,
            questions.findIndex((question: Question) => {
                return question.id == id
            })
        )].id)
    }
    
}