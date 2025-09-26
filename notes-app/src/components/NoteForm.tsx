import React, { useState } from "react";
import TextInput from "./inputs/TextInput";
import Select from "./inputs/Select";
import TextArea from "./inputs/TextArea";

type NoteFormProps = {
    notes: NoteType[];
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
};

type NoteType = {
    id: number,
    title: string,
    priority: 'Easy' | 'Medium' | 'Hard',
    category: 'Work' | 'Personal' | 'Ideas',
    description: string
};

const NoteForm = ({ notes, setNotes }: NoteFormProps) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState<NoteType>({
        id: Date.now(),
        title: '',
        priority: "Easy",
        category: "Personal",
        description: ''
    });

    const priorityOptions = [
        { value: 'Easy', label: '🟢Easy' },
        { value: 'Medium', label: '🟡Medium' },
        { value: 'Hard', label: '🔴Hard' },
    ];

    const categoriesOptions = [
        { value: 'Work', label: '📂Work' },
        { value: 'Personal', label: '🏡Personal' },
        { value: 'Ideas', label: '💡Ideas' },
    ];


    const handleChange = (e: React.ChangeEvent<{ name: string, value: any }>) => {
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.description) return;

        // Create note object
        const newNote = { ...formData };

        // Add notes to state
        setNotes([newNote, ...notes]);

        // Reset form data
        setFormData({
            id: 0,
            title: '',
            category: 'Personal',
            priority: 'Easy',
            description: ''
        })
    }

    return (
        <>
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="w-full bg-orange-100 border border-orange-300 text-orange-800 py-2 rounded-lg cursor-pointer hover:bg-orange-200 hover:border-orange-300 transition mb-4">
                {isFormVisible ? 'Hide Form ✖️' : 'Add New Note ➕'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <Select label="Priority" name="priority" options={priorityOptions} onChange={handleChange} />
                    <Select label="Category" name="category" options={categoriesOptions} onChange={handleChange} />
                    <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600">Add Note</button>
                </form>
            )}

        </>
    )
}

export default NoteForm;