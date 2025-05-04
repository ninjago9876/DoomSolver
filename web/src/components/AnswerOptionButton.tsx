import React from "react";
import { Button } from "./Button";

export interface AnswerOptionButtonProps {
    lightState: ("incorrect" | "correct" | "none"),
    onClick: () => void
}

export const AnswerOptionButton: React.FC<AnswerOptionButtonProps & React.PropsWithChildren> = (
    { lightState, onClick, children }) => {
    
        return (
            <div
                className="bg-red-500"
            >
                <Button
                    onClick={onClick}
                >
                    {children}
                </Button>
            </div>
        )
}