import { useState } from "react";

type Note = {
    title: string;
    priority: 'Easy' | 'Medium' | 'Hard';
    category: 'Work' | 'Hobby';
    description: string;
}

const NoteForm = () => {
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<'Easy' | 'Medium' | 'Hard' | ''>('');
    const [category, setPCategory] = useState<'Work' | 'Hobby' | ''>('');
    const [description, setDescription] = useState<string>('');

    return (
        <form>
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="priority" className="block font-semibold">Priority</label>
                <select name="" id="" className="w-full p-2 border rounded-lg"></select>
            </div>
        </form>
    )
}

export default NoteForm;