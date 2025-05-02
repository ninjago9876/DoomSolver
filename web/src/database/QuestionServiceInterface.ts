import { Question } from "../types/Question";

export interface QuestionService {
    submitAnswer(): Promise<void>;
    getNextQuestion(): Promise<Question | null>;
}
  