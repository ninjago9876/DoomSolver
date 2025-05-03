import { useEffect, useMemo, useState } from "react"
import QuestionCard from "./QuestionCard"
import { Question } from "../../../shared/types/question"
import { QuestionService } from "../server-io/questionService"
import SubmitAnswerResponse from "../../../shared/server-io/submitAnswer.response"
import GetQuestionResponse from "../../../shared/server-io/getQuestion.response"

function Questions() {
    const questionService = useMemo(() => {
        return new QuestionService
    }, [])

    const loadingQuestion: Question = {
        id: "loading",
        prompt: "Loading... Please wait",
        options: ["...", "...", "...", "..."],
        tags: [],
        correctOption: 0
    }

    const [currentQuestion, setCurrentQuestion] = useState(loadingQuestion);

    useEffect(() => {
        questionService.getQuestion({
            questionID: ""
        }).then((response: GetQuestionResponse) => {
            setCurrentQuestion(response.question)
        })
    }, [questionService])

    const onAnswer = (optionIndex: number) => {
        questionService.submitAnswer({
            answeredQuestionID: currentQuestion.id,
            answerTimeMilliseconds: 0,
            chosenOptionIndex: optionIndex
        }).then((response: SubmitAnswerResponse) => {
            setCurrentQuestion(response.newQuestion)
        })
    }

    return (
        <>
            <QuestionCard
                question={currentQuestion}
                onAnswer={onAnswer}
            ></QuestionCard>
        </>
    )
}
export default Questions