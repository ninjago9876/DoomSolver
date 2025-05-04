import React from "react";

export interface ButtonProps {
    onClick: () => void
}

export const Button: React.FC<ButtonProps & React.PropsWithChildren> = ({ onClick, children }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}