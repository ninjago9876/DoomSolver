import { Question } from "./question";

export interface Answer {
    question: Question,
    chosenOption: number,
    answerTimeMS: number
}