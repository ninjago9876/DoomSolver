import { useEffect, useMemo, useRef, useState } from "react"
import QuestionCard from "./QuestionCard"
import { Question } from "../types/question"
import { checkAnswer, QuestionService } from "../io/questionService"
import { Answer } from "../types/answer"

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
    const [correctAnimationRunning, setCorrectAnimationRunning] = useState(false)

    useEffect(() => {
        questionService.getQuestionAtID("random").then((question: Question) => {
            setCurrentQuestion(question)
        })
    }, [questionService])

    const onAnswer = (answer: Answer) => {      
        if (incorrectAnimationRunning) { return }

        questionService.storeAnswer(answer)

        questionService.findNextQuestion(answer.question.id).then((newQuestion: Question) => {
            const correct = checkAnswer(answer)
            if (!correct) {
                setIncorrectAnimationRunning(true)
                
                const incorrectSound = new Audio("/DoomSolver/incorrect.mp3");
                incorrectSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current!.classList.remove("fade-border-from-green")
                questionCardRef.current!.classList.add("fade-border-from-red")
                questionCardRef.current!.classList.add("locked")

                setTimeout(() => {
                    questionCardRef.current!.classList.remove("fade-border-from-red")
                    questionCardRef.current!.classList.remove("locked")

                    setIncorrectAnimationRunning(false)
                    setCurrentQuestion(newQuestion)
                }, 1000)
            } else {
                setCurrentQuestion(newQuestion)
                
                const correctSound = new Audio("/DoomSolver/correct.mp3");
                correctSound.play().catch(() => {console.log("Couldn't play sound!")})

                questionCardRef.current!.classList.add("pop-scale-in")
                setTimeout(() => {
                    questionCardRef.current!.classList.remove("pop-scale-in")
                }, 400)
                
                if (!correctAnimationRunning) {
                    setCorrectAnimationRunning(true)
                    questionCardRef.current!.classList.add("fade-border-from-green")
                    setTimeout(() => {
                        questionCardRef.current!.classList.remove("fade-border-from-green")
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