import { forwardRef, useImperativeHandle, useRef } from "react"
import './QuestionCard.css'
import { Question } from "../types/question"
import clsx from "clsx";
import { useAnimationTrigger } from "../utility/animation-hook";
import { getCSSVariable, parseCSSTimeToMS } from "../utility/css-parse";

export interface QuestionCardRef {
    triggerShakeAnimation: () => void;
    isShaking: () => boolean;
    triggerPopAnimation: () => void;
    isPopping: () => boolean;
    lightUpOption: (index: number, type: "red" | "green" | "none") => void;
    setLocked: (value: boolean) => void;
}

interface QuestionCardProps {
    question: Question;
    onAnswer: (optionIndex: number) => void;
}

const QuestionCard = forwardRef<QuestionCardRef, QuestionCardProps>(
    ({ question, onAnswer }, ref) => {

    const cardRef = useRef<HTMLDivElement>(null)
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

    const { active: isShaking, trigger: shake } = useAnimationTrigger(parseCSSTimeToMS(getCSSVariable("--shake-animation-time")))
    const { active: isPopping, trigger: pop } = useAnimationTrigger(parseCSSTimeToMS(getCSSVariable("--pop-animation-time")))

    useImperativeHandle(ref, () => ({
        triggerShakeAnimation: () => {
            if (cardRef.current) {
                shake()
                cardRef.current.classList.add("shake")
                setTimeout(() => {
                    cardRef.current?.classList.remove("shake")
                }, parseCSSTimeToMS(getCSSVariable("--shake-animation-time")))
            }
        },
        isShaking: () => isShaking,
        triggerPopAnimation: () => {
            if (cardRef.current) {
                pop()
                cardRef.current.classList.add("pop")
                setTimeout(() => {
                    cardRef.current?.classList.remove("pop")
                }, parseCSSTimeToMS(getCSSVariable("--pop-animation-time")))
            }
        },
        isPopping: () => isPopping,
        lightUpOption: (index: number, type: "red" | "green" | "none") => {
            optionRefs.current[index]?.classList.remove(`light-up-red`)
            optionRefs.current[index]?.classList.remove(`light-up-green`)
            if (type == "none") { return }
            setTimeout(() => {
                optionRefs.current[index]?.classList.add(`light-up-${type}`)
            }, 0)
        },
        setLocked: (value: boolean) => {
            cardRef.current?.classList.toggle("locked", value)
        }
    }))


    return (
        <div className="question-card" ref={cardRef}>
            <p className="question">{question.prompt}</p>
            <div className="answer-options">
                {question.options.length == 2 || question.options.length == 4 ? (
                    question.options.map((option, index) => (
                        <button
                            ref={(el) => {optionRefs.current[index] = el}}
                            key={index}
                            className={clsx(
                                "answer-option"
                            )}
                            onClick={() => onAnswer(index)
                            }>{option}</button>
                    ))
                ) : (
                    <p className="error">Invalid number of answer options provided!</p>
                )}
            </div>
        </div>
    )
})

export default QuestionCard