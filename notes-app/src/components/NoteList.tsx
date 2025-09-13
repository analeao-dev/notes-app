
type NoteListProps = { notes: NoteType[] };

type NoteType = {
    id: number,
    title: string,
    priority: 'Easy' | 'Medium' | 'Hard',
    category: 'Work' | 'Personal' | 'Ideas',
    description: string
};


const NoteList = ({ notes }: NoteListProps) => {
    return (
        notes.length === 0
            ? (<p className="text-center">No Notes Yet</p>)
            : (
                <div className="space-y-4">
                    {notes.map((note) => (
                        <div className={`bg-gray-100 rounded-lg shadow-lg my-4 p-4 border-l-4 
                        ${note.priority === 'Easy' ? 'border-green-300' : note.priority === 'Medium' ? 'border-yellow-300' : 'border-red-300'}`}>
                            <p className="font-semibold text-xl pb-1">{note.title}</p>
                            <div className="flex gap-2 pb-4">
                                <span className={`text-sm px-2 rounded-full font-semibold 
                        ${note.priority === 'Easy' ? 'bg-green-100 text-green-500' :
                                        note.priority === 'Medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-red-100 text-red-500'
                                    }`}>{note.priority}</span>
                                <span className="text-sm px-2 bg-blue-100 rounded-full text-blue-500 font-semibold">{note.category}</span>
                            </div>
                            <p className="break-words whitespace-pre-wrap">{note.description}</p>
                        </div>
                    ))}
                </div>)
    );
}

export default NoteList;