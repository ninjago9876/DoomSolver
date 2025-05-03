import { useEffect, useMemo, useRef, useState } from "react"
import QuestionCard, { QuestionCardRef } from "./QuestionCard"
import { Question } from "../types/question"
import { checkAnswer, QuestionService } from "../io/questionService"
import { Answer } from "../types/answer"

function Questions() {
    const questionService = useMemo(() => { return new QuestionService }, [])

    const questionCardRef = useRef<QuestionCardRef>(null);

    const loadingQuestion: Question = {
        id: "loading",
        prompt: "Loading... Please wait",
        options: ["...", "...", "...", "..."],
        tags: [],
        correctOption: 0
    }

    const [currentQuestion, setCurrentQuestion] = useState(loadingQuestion);
    const [incorrectAnimationRunning, setIncorrectAnimationRunning] = useState(false)
    const [correctAnimationRunning, setCorrectAnimationRunning] = useState(false)

    useEffect(() => {
        questionService.getQuestionAtID("random").then((question: Question) => {
            setCurrentQuestion(question)
        })
    }, [questionService])

    const onAnswer = (answer: Answer) => {      
        if (incorrectAnimationRunning) { return }

        questionService.storeAnswer(answer)

        questionCardRef.current?.getAnswerOptionElement(answer.chosenOption)?.blur()

        questionService.findNextQuestion(answer.question.id).then((newQuestion: Question) => {
            const correct = checkAnswer(answer)
            if (!correct) {
                setIncorrectAnimationRunning(true)
                
                const incorrectSound = new Audio("/DoomSolver/incorrect.mp3");
                incorrectSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current!.getContainer()!.classList.remove("fade-border-from-green")
                questionCardRef.current!.getContainer()!.classList.add("fade-border-from-red")
                questionCardRef.current!.getContainer()!.classList.add("shake")
                questionCardRef.current!.getContainer()!.classList.add("locked")

                questionCardRef.current?.getAnswerOptionElement(answer.chosenOption)?.classList.add("fade-border-from-red")
                questionCardRef.current?.getAnswerOptionElement(
                    answer.question.correctOption
                )?.classList.add("fade-border-from-green")

                setTimeout(() => {
                    questionCardRef.current!.getContainer()!.classList.remove("fade-border-from-red")
                    questionCardRef.current!.getContainer()!.classList.remove("shake")
                    questionCardRef.current!.getContainer()!.classList.remove("locked")
                    questionCardRef.current?.getAnswerOptionElement(answer.chosenOption)?.classList.remove("fade-border-from-red")
                    questionCardRef.current?.getAnswerOptionElement(
                        answer.question.correctOption
                    )?.classList.remove("fade-border-from-green")

                    setIncorrectAnimationRunning(false)
                    setCurrentQuestion(newQuestion)
                }, 1000)
            } else {
                setCurrentQuestion(newQuestion)
                
                const correctSound = new Audio("/DoomSolver/correct.mp3");
                correctSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current!.getContainer()!.classList.add("pop-scale-in")
                setTimeout(() => {
                    questionCardRef.current!.getContainer()!.classList.remove("pop-scale-in")
                }, 400)
                
                if (!correctAnimationRunning) {
                    setCorrectAnimationRunning(true)
                    questionCardRef.current!.getContainer()!.classList.add("fade-border-from-green")
                    setTimeout(() => {
                        questionCardRef.current!.getContainer()!.classList.remove("fade-border-from-green")
                        setCorrectAnimationRunning(false)
                    }, 1500)
                }
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