import { useState } from "react"

type SelectProps = {
    name: string,
    id: string,
    className?: string,
    label: string,
    items: { id: number, label: string }[],
    onSelect: ({ }: { id: number, label: string }) => void,
}

export const SelectAutocomplete = (props: SelectProps) => {
    const { id, className, items, name, label, onSelect } = props;

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState([...items]);

    const handleFocus = () => {
        setOptions(items);
        setIsSelectOpen(true);
    }

    const handleSelect = (item: {id: number, label: string}) => {
        setIsSelectOpen(false);
        setInput(item.label);
        onSelect(item);
    }

    const handleSearch = (value: string) => {
        setInput(value);
        const newOptions = items.filter(item => item.label.toLowerCase().includes(value));
        setOptions(newOptions);
    }

    return (
        <div className="autocomplete-wrapper">
            <div className={`input-wrapper ${className}`}>
                <label>{label}</label>
                <div className="icon-input">
                    <input id={id} name={name} value={input} onChange={e => handleSearch(e.target.value)}
                        onFocus={() => handleFocus()}/>
                    <i className="fa fa-search" />
                </div>
            </div>
            {
                isSelectOpen &&
                <ul className="select-autocomplete-items">
                    {
                        options.map((item, index) => {
                            return (
                                <div onFocus={(_e) => handleSelect(item)}>
                                    <input id={`radio-${item.id}`} type="radio"
                                    key={index} value={item.id}/>
                                    <label htmlFor={`radio-${item.id}`}>{item.label}</label>
                                </div>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}