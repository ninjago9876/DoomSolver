import { forwardRef } from "react"
import './QuestionCard.css'
import { Question } from "../types/question"
import { Answer } from "../types/answer";

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: Answer) => void;
}

const QuestionCard = forwardRef<HTMLDivElement, QuestionCardProps>(({ question, onAnswer }, ref) => {
    return (
        <div className="question-card" ref={ref}>
            <p className="question">{question.prompt}</p>
            <div className="answer-options">
                {question.options.length == 2 || question.options.length == 4 ? (
                    question.options.map((option, index) => (
                        <button key={index} className="answer-option" onClick={() => onAnswer({
                            question: question,
                            chosenOption: index,
                            answerTimeMS: 0 // TODO: Change this to keep track of actual answer time
                        })}>{option}</button>
                    ))
                ) : (
                    <p className="error">Invalid number of answer options provided!</p>
                )}
            </div>
        </div>
    )
})

export default QuestionCard