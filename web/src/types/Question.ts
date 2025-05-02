export interface Question {
    id: string;
    question: string;
    options: string;
    correctAnswerID: string; // The ID in the options array of the correct option NOT the option text at that index
}