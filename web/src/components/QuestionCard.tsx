import React from "react"
import './QuestionCard.css'
import { Question } from "../../../shared/types/question"

interface QuestionCardProps {
    question: Question;
    onAnswer: (optionIndex: number, optionText: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
    return (
        <div className="question-card">
            <p className="question">{question.prompt}</p>
            <div className="answer-options">
                {question.options.length == 2 || question.options.length == 4 ? (
                    question.options.map((option, index) => (
                        <button className="answer-option" onClick={() => onAnswer(index, option)}>{option}</button>
                    ))
                ) : (
                    <p className="error">Invalid number of answer options provided!</p>
                )}
            </div>
        </div>
    )
}

export default QuestionCard