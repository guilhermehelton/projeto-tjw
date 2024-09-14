import './Select.css'

type SelectProps = {
    name: string,
    id: string,
    className?: string,
    label: string,
    items: { id: number, label: string }[],
    onSelect: (item : { id: number, label: string }) => void,
}

export const Select = (props: SelectProps) => {
    return (
        <div className='input-wrapper'>
            <label htmlFor={props.id}>{props.label}</label>
            <select className={`custom-select ${props.className}`} name={props.name} id={props.id}>
            <option value={""}>Limpar</option>
            {
                props.items.map((option, index) => {
                    return (
                        <option key={index} value={option.label} onClick={() => props.onSelect(option)}>{option.label}</option>
                    )
                })
            }
        </select>
        </div>
    )
}