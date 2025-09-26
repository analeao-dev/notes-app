import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = {
    label: string;
    value: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ label, value, ...rest }: TextAreaProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={label} className="block font-semibold">
                {label}
            </label>
            <textarea
                name={label}
                className="w-full p-2 border rounded-lg"
                value={value}
                id={label}
                {...rest}
            ></textarea>
        </div>
    )
}

export default TextArea;