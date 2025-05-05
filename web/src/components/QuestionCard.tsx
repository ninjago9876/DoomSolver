import { forwardRef, useImperativeHandle, useRef } from "react"
import { Question } from "../types/question"
import { Answer } from "../types/answer";
import { AnswerOptionButton } from "./AnswerOptionButton";

// 

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
        <div className="flex items-center justify-center h-screen">
            <div className="w-[80vmin] h-[80vmin] flex flex-wrap" ref={containerRef}>
                <p className="">{question.prompt}</p>
                <div className="">
                    { question.options.length == 4 ? 
                        question.options.map((option, index) => (
                            <AnswerOptionButton key={index}>{option}</AnswerOptionButton>
                        ))
                        :
                        <p>Invalid number of options!</p>
                    }
                </div>
            </div>
        </div>
    )
})

export default QuestionCard