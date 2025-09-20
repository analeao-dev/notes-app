import type { InputHTMLAttributes } from "react";

type TextInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;


const TextInput = ({ label, name, value, onChange, required = false }: TextInputProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block font-semibold">
                {label}
            </label>
            <input
                name={name}
                type="text"
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default TextInput;