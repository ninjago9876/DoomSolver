import React from "react"
import './QuestionCard.css'

interface QuestionCardProps {
    question: string;
    options: string[];
    onAnswer: (answerID: number, answerString: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswer }) => {
    return (
        <div className="question-card">
            <p className="question">{question}</p>
            <div className="answer-options">
                {options.length == 2 || options.length == 4 ? (
                    options.map((option, index) => (
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