import { forwardRef, useImperativeHandle, useRef } from "react"
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
      getAnswerOptionElement: (index: number) => { return optionRefs.current[index] },
    }));

    return (
        <div className="" ref={containerRef}>
            <p className="">{question.prompt}</p>
            <div className="">
                { question.options.length == 4 ? 
                    question.options.map((option, index) => (
                        <button key={index}>{option}</button>
                    ))
                    :
                    <p>Invalid number of options!</p>
                }
            </div>
        </div>
    )
})

export default QuestionCard