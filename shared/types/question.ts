export interface Question {
    id: string;
    prompt: string;
    options: string[];
    correctOption: number;
    tags: string[];
}