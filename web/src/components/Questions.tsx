import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import QuestionCard, { QuestionCardRef } from "./QuestionCard"
import { Question } from "../types/question"
import { checkAnswer, QuestionService } from "../io/questionService"
import { Answer } from "../types/answer"

const loadingQuestion: Question = {
    id: "loading",
    prompt: "Loading... Please wait",
    options: ["...", "...", "...", "..."],
    tags: [],
    correctOption: 0
}

const INCORRECT_ANSWER_PONDERING_TIME_MS = 5000

function transitionToNextQuestion(questionCardRef: RefObject<QuestionCardRef>, nextQuestion: Question) {
    return
}

export function Questions() {
    const questionService = useMemo(() => { return new QuestionService }, [])
    const questionCardRef = useRef<QuestionCardRef>(null);

    const [currentQuestion, setCurrentQuestion] = useState(loadingQuestion);
    const [transitionAnimationRunning, setTransitionAnimationRunning] = useState(false)

    useEffect(() => {
        questionService.getQuestionAtID("random").then((question: Question) => {
            setCurrentQuestion(question)
        })
    }, [questionService])

    const onAnswer = (answer: Answer) => {      
        questionService.storeAnswer(answer)

        questionService.findNextQuestion(answer.question.id).then((newQuestion: Question) => {
            const correct = checkAnswer(answer)
            if (correct) {
                setCurrentQuestion(newQuestion)
            } else {
                setTimeout(() => {
                    setCurrentQuestion(newQuestion)
                }, INCORRECT_ANSWER_PONDERING_TIME_MS)
            }
        })
    }

    return (
        <>
            <QuestionCard
                question={currentQuestion}
                onAnswer={onAnswer}
                ref={questionCardRef}
            ></QuestionCard>
        </>
    )
}
export default Questions