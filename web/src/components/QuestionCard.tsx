import { forwardRef } from "react"
import './QuestionCard.css'
import { Question } from "../../../shared/types/question"

interface QuestionCardProps {
    question: Question;
    onAnswer: (optionIndex: number, optionText: string) => void;
}

const QuestionCard = forwardRef<HTMLDivElement, QuestionCardProps>(({ question, onAnswer }, ref) => {
    return (
        <div className="question-card" ref={ref}>
            <p className="question">{question.prompt}</p>
            <div className="answer-options">
                {question.options.length == 2 || question.options.length == 4 ? (
                    question.options.map((option, index) => (
                        <button key={index} className="answer-option" onClick={() => onAnswer(index, option)}>{option}</button>
                    ))
                ) : (
                    <p className="error">Invalid number of answer options provided!</p>
                )}
            </div>
        </div>
    )
})

export default QuestionCard