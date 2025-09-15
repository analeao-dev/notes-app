import type { InputHTMLAttributes } from "react";

type TextInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;


const TextInput = ({ label, name, id, value, onChange, ...rest }: TextInputProps) => {
    return (
        <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
                {label}
            </label>
            <input
                name={name}
                id={id}
                type="text"
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={ }
            />
        </div>
    );
}

export default TextInput;