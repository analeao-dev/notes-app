import type { SelectHTMLAttributes } from "react";

type Option = {
    value: string | number;
    label: string;
}

type SelectProps = {
    label: string;
    options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ label, name, options, required = false, ...rest }: SelectProps) => {
    return (

        <div className="mb-4">
            <label htmlFor={name} className="block font-semibold">{label}</label>
            <select name={name} id={name} className="w-full p-2 border rounded-lg" required={required} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}

            </select>
        </div>

    );
}

export default Select;