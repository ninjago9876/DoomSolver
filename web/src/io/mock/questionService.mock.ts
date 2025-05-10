import { randomIntExcluding } from "../../utility/random";
import { Answer } from "../../types/answer";
import { Question } from "../../types/question";
import { IQuestionService } from "../IQuestionService"

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
            "term1": "randint(1, 100)",
            "term2": "randint(1, 100)",
            "correct": "add(term1, term2)",
            "seed": "randint(1, 10000)"
        },
        id: "addition_1-100",
        prompt: "What is <<term1>> + <<term2>>?",
        options: [
            "<<variate-option(correct, correct-option, 0, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 1, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 2, 5, 0, seed)>>", 
            "<<variate-option(correct, correct-option, 3, 5, 0, seed)>>"
        ],
        tags: ["math", "arithmetic", "addition", "medium"],
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
    {
        variables: {
            "term1": "randint(1, 20)",
            "term2": "randint(1, 20)",
            "correct": "mult(term1, term2)",
            "seed": "randint(1, 10000)"
        },
        id: "multiplication_1-20",
        prompt: "What is <<term1>> * <<term2>>?",
        options: [
            "<<variate-option(correct, correct-option, 0, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 1, 5, 0, seed)>>",
            "<<variate-option(correct, correct-option, 2, 5, 0, seed)>>", 
            "<<variate-option(correct, correct-option, 3, 5, 0, seed)>>"
        ],
        tags: ["math", "arithmetic", "multiplication", "medium"],
        correctOption: -1
    },
]

export class MockQuestionService implements IQuestionService {
    async storeAnswer(answer: Answer): Promise<void> {
        console.log("Pretending to store answer: " + JSON.stringify(answer))
    }
    async getQuestionAtID(id: string): Promise<Question> {
        if (id == "random") { id = questions[Math.floor(Math.random() * questions.length)].id }
        const question: Question | undefined = questions.find((question: Question) => {
            return question.id == id
        })
        if (!question) {
            throw new Error(`There exists no question at ID: ${id}`)
        }

        return question
    }
    async getRandomQuestion() {
        return questions[Math.floor(Math.random() * questions.length)]
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