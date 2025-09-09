import { useState } from "react";

type PriorityType = 'Easy' | 'Medium' | 'Hard';
type CategoryType = 'Work' | 'Personal' | 'Ideas';
// type NoteType = {
//     tile: string,
//     priority: 'Easy' | 'Medium' | 'Hard',
//     category: 'Work' | 'Personal' | 'Ideas',
//     description: string
// };

const NoteForm = () => {
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<PriorityType>('Easy');
    const [category, setCategory] = useState<CategoryType>('Personal');
    const [description, setDescription] = useState<string>('');

    // const [formData, setFormData] = useState<NoteType>({
    //     tile: '',
    //     priority:"Easy",
    //     category: "Personal",
    //     description: ''
    // });

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
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block font-semibold">Priority</label>
                <select className="w-full p-2 border rounded-lg" value={priority} onChange={(e) => setPriority(e.target.value as PriorityType)}>
                    <option value="Easy">🟢Easy</option>
                    <option value="Medium">🟡Medium</option>
                    <option value="Hard">🔴Hard</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block font-semibold">Category</label>
                <select id="category" className="w-full p-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value as CategoryType)}>
                    <option value="Easy">📂Work</option>
                    <option value="Medium">🏡Personal</option>
                    <option value="Hard">💡Ideas</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block font-semibold">
                    Title
                </label>
                <textarea
                    id="description"
                    className="w-full p-2 border rounded-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600">Add Note</button>
        </form>
    )
}

export default NoteForm;