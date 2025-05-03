import { Answer } from "../types/answer";



import { MockQuestionService } from "./mock/questionService.mock";
export { MockQuestionService as QuestionService };

// Totally deprecated
// import { CloudflareQuestionService } from "./cloudflare/questionService.cloudflare";
// export { CloudflareQuestionService as QuestionService };

// import { FirebaseQuestionService } from "./firebase/questionService.firebase";
// export { FirebaseQuestionService as QuestionService };


export function checkAnswer(answer: Answer): boolean {
    return answer.chosenOption == answer.question.correctOption
}