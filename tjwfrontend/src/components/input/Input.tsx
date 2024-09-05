import React from "react";
import './Input.css';

type propsType = {
    id: string,
    name: string,
    className?: string,
    placeholder?: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: propsType) => {
    const {id, className, value, name, placeholder, label, onChange} = props;

    return (
        <div className="input-wrapper">
            <label>{label}</label>
            <input className={className} id={id} name={name} value={value} placeholder={placeholder} onChange={e => onChange(e)}/>
        </div>
    )
}

export default Input;

