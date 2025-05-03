export default interface SubmitAnswerRequest {
    answeredQuestionID: string;
    chosenOptionIndex: number;
    answerTimeMilliseconds: number;
}