import { randomIntExcluding } from "../../utility/random";
import { Answer } from "../../types/answer";
import { Question } from "../../types/question";
import { IQuestionService } from "../IQuestionService"
import { parseQuestion } from "../../utility/field-parser";

const questions: Question[] = [
    {
        variables: {
            "term1": "randint(1, 10)",
            "term2": "randint(1, 10)",
            "correct": "add(term1, term2)",
            "seed": "randint(1, 10000)"
        },
        id: "addition_1-10",
        prompt: "What is <<term1>> + <<term2>>?",
        options: [
            "<<variate-option(correct, correct-option, 0, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 1, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 2, 5, 0, seed)>>", 
            "<<variate-option(correct, correct-option, 3, 5, 0, seed)>>"
        ],
        tags: ["math", "arithmetic", "addition", "easy"],
        correctOption: -1
    },
    {
        variables: {
            "term1": "randint(1, 10)",
            "term2": "randint(1, 10)",
            "correct": "mult(term1, term2)",
            "seed": "randint(1, 10000)"
        },
        id: "multiplication_1-10",
        prompt: "What is <<term1>> * <<term2>>?",
        options: [
            "<<variate-option(correct, correct-option, 0, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 1, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 2, 5, 0, seed)>>", 
            "<<variate-option(correct, correct-option, 3, 5, 0, seed)>>"
        ],
        tags: ["math", "arithmetic", "multiplication", "easy"],
        correctOption: -1
    },
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
            0,
            questions.length,
            questions.findIndex((question: Question) => {
                return question.id == id
            })
        )].id)
    }
    
}