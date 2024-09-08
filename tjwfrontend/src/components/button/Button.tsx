import React from "react";
import "./Button.css";

type ButtonProps = {
    isSecondary?: boolean,
    className?: string,
    name: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={(e) => props.onClick(e)}
            className={`form-button ${props.isSecondary ? 'secondary' : ''} ${props.className}`}>{props.name}</button>
    )
}

export default Button;