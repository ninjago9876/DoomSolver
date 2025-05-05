import React from "react";
import { Button } from "./Button";
import clsx from "clsx";

export interface AnswerOptionButtonProps {
    lightState?: ("incorrect" | "correct" | "none"),
    onClick?: () => void
}

export const AnswerOptionButton: React.FC<AnswerOptionButtonProps & React.PropsWithChildren> = (
    { lightState, onClick, children }) => {
    
        return (
            <div>
                <button
                    className={clsx([
                        "w-1/2 aspect-square flex items-center justify-center",
                        "panel"
                    ])}
                    onClick={onClick}
                >
                    {children}
                </button>
            </div>
        )
}