import { useEffect, useMemo, useRef, useState } from "react"
import QuestionCard from "./QuestionCard"
import { Question } from "../../../shared/types/question"
import { QuestionService } from "../server-io/questionService"
import SubmitAnswerResponse from "../../../shared/server-io/submitAnswer.response"
import GetQuestionResponse from "../../../shared/server-io/getQuestion.response"

function Questions() {
    const questionService = useMemo(() => { return new QuestionService }, [])

    const questionCardRef = useRef<HTMLDivElement>(null);

    const loadingQuestion: Question = {
        id: "loading",
        prompt: "Loading... Please wait",
        options: ["...", "...", "...", "..."],
        tags: [],
        correctOption: 0
    }

    const [currentQuestion, setCurrentQuestion] = useState(loadingQuestion);
    const [incorrectAnimationRunning, setIncorrectAnimationRunning] = useState(false)

    useEffect(() => {
        questionService.getQuestion({
            questionID: "random"
        }).then((response: GetQuestionResponse) => {
            setCurrentQuestion(response.question)
        })
    }, [questionService])

    const onAnswer = (optionIndex: number) => {      
        if (incorrectAnimationRunning) { return }

        const promise = questionService.submitAnswer({
            answeredQuestionID: currentQuestion.id,
            answerTimeMilliseconds: 0,
            chosenOptionIndex: optionIndex
        })

        let response: SubmitAnswerResponse
        promise.then((res: SubmitAnswerResponse) => {
            response = res
            if (!response.correct) {
                setIncorrectAnimationRunning(true)
                
                const incorrectSound = new Audio("/incorrect.mp3");
                incorrectSound.play().catch(() => {console.log("Couldn't play sound!")})

                setTimeout(() => {
                    questionCardRef.current!.classList.remove("fade-border-from-green")
                    questionCardRef.current!.classList.add("fade-border-from-red")

                    setTimeout(() => {
                        questionCardRef.current!.classList.remove("fade-border-from-red")

                        setIncorrectAnimationRunning(false)
                        setCurrentQuestion(response.newQuestion)
                    }, 2800)
                }, 0)
            } else {
                setCurrentQuestion(response.newQuestion)

                const correctSound = new Audio("/correct.mp3");
                correctSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current!.classList.add("fade-border-from-green")
                setTimeout(() => {
                    questionCardRef.current!.classList.remove("fade-border-from-green")
                }, 1500)
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