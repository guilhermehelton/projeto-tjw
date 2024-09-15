import React from "react";
import './Input.css';

type propsType = {
    id: string,
    name: string,
    className?: string,
    placeholder?: string,
    label: string,
    value: string,
    maxLength?: number,
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: propsType) => {
    const {id, className, value, name, placeholder, label, onChange, maxLength} = props;

    return (
        <div className={`input-wrapper ${className}`}>
            <label>{label}</label>
            <input id={id} name={name} value={value} placeholder={placeholder}
                onChange={e => onChange(e)}
                maxLength={maxLength}/>
        </div>
    )
}

export default Input;

