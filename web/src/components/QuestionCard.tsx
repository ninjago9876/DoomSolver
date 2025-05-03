import { forwardRef, useImperativeHandle, useRef } from "react"
import './QuestionCard.css'
import { Question } from "../types/question"
import { Answer } from "../types/answer";

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: Answer) => void;
}

export interface QuestionCardRef {
    getContainer(): HTMLDivElement | null;
    getAnswerOptionElement(index: number): HTMLButtonElement | null;
  }

const QuestionCard = forwardRef<QuestionCardRef, QuestionCardProps>(({ question, onAnswer }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      getContainer: () => containerRef.current,
      getAnswerOptionElement: (index: number) => {
        return optionRefs.current[index]
      },
    }));

    return (
        <div className="question-card" ref={containerRef}>
            <p className="question">{question.prompt}</p>
            <div className="answer-options">
                {question.options.length == 2 || question.options.length == 4 ? (
                    question.options.map((option, index) => (
                        <button 
                            key={index}
                            ref={(el) => { optionRefs.current[index] = el }}
                            className="answer-option"
                            onClick={() => onAnswer({
                                    question: question,
                                    chosenOption: index,
                                    answerTimeMS: 0 // TODO: Change this to keep track of actual answer time
                                })
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