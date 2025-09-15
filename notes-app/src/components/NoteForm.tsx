import React, { useState } from "react";
import TextInput from "./inputs/TextInput";

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

    const handleChange = (e: React.ChangeEvent<{ name: string, value: any }>) => {
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
                    <TextInput />                
                    <div className="mb-4">
                        <label htmlFor="priority" className="block font-semibold">Priority</label>
                        <select name="priority" id="priority" className="w-full p-2 border rounded-lg" value={formData.priority} onChange={handleChange}>
                            <option value="Easy">🟢Easy</option>
                            <option value="Medium">🟡Medium</option>
                            <option value="Hard">🔴Hard</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block font-semibold">Category</label>
                        <select name="category" id="category" className="w-full p-2 border rounded-lg" value={formData.category} onChange={handleChange}>
                            <option value="Work">📂Work</option>
                            <option value="Personal">🏡Personal</option>
                            <option value="Ideas">💡Ideas</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-semibold">
                            Title
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="w-full p-2 border rounded-lg"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600">Add Note</button>
                </form>
            )}

        </>
    )
}

export default NoteForm;