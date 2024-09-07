import React from "react";
import "./Button.css";

type ButtonProps = {
    isSecondary?: boolean,
    className?: string,
    name: string
}

const Button = (props: ButtonProps) => {
    return (
        <button className={`form-button ${props.isSecondary ? 'secondary' : ''} ${props.className}`}>{props.name}</button>
    )
}

export default Button;