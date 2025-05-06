export interface Question {
    variables: Record<string, string>
    id: string;
    prompt: string;
    options: string[];
    correctOption: number;
    tags: string[];
}