import { useEffect, useMemo, useRef, useState } from "react"
import QuestionCard, { QuestionCardRef } from "./QuestionCard"
import { Question } from "../types/question"
import { checkAnswer, QuestionService } from "../io/questionService"
import { getCSSVariable, parseCSSTimeToMS } from "../utility/css-parse"

function Questions() {
    const questionService = useMemo(() => { return new QuestionService }, [])
    const questionCardRef = useRef<QuestionCardRef>(null)

    const loadingQuestion: Question = {
        id: "loading",
        prompt: "Loading... Please wait",
        options: ["...", "...", "...", "..."],
        tags: [],
        correctOption: 0
    }

    const [currentQuestion, setCurrentQuestion] = useState(loadingQuestion);

    useEffect(() => {
        questionService.getQuestionAtID("random").then((question: Question) => {
            setCurrentQuestion(question)
        })
    }, [questionService])

    const onAnswer = (optionIndex: number) => {      
        questionService.storeAnswer({
            chosenOption: optionIndex,
            answerTimeMS: 0,
            question: currentQuestion
        })

        questionService.findNextQuestion(currentQuestion.id).then((newQuestion: Question) => {
            const correct = checkAnswer({
                chosenOption: optionIndex,
                answerTimeMS: 0,
                question: currentQuestion
            })

            if (!correct) {
                const incorrectSound = new Audio("/DoomSolver/incorrect.mp3");
                incorrectSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current?.triggerShakeAnimation()
                questionCardRef.current?.lightUpOption(currentQuestion.correctOption, "red")
                questionCardRef.current?.setLocked(true)

                setTimeout(() => {
                    setCurrentQuestion(newQuestion)
                    questionCardRef.current?.triggerPopAnimation()
                    questionCardRef.current?.lightUpOption(currentQuestion.correctOption, "none")
                    questionCardRef.current?.setLocked(false)

                }, parseCSSTimeToMS(getCSSVariable("--incorrect-answer-hold-time")))
            } else {
                setCurrentQuestion(newQuestion)
                questionCardRef.current?.triggerPopAnimation()

                questionCardRef.current?.lightUpOption(optionIndex, "green")
                setTimeout(() => {
                    questionCardRef.current?.lightUpOption(optionIndex, "none")
                }, 200)
                
                const correctSound = new Audio("/DoomSolver/correct.mp3");
                correctSound.play().catch(() => {console.log("Couldn't play sound!")})
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