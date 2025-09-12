
type NoteListProps = { note: NoteType };

type NoteType = {
    id: number,
    title: string,
    priority: 'Easy' | 'Medium' | 'Hard',
    category: 'Work' | 'Personal' | 'Ideas',
    description: string
};


const NoteList = ({ note }: NoteListProps) => {
    return (
        <div className={`bg-gray-100 rounded-lg shadow-lg mb-4 p-6 border-l-8 border-solid 
        ${note.priority === 'Easy' ? 'border-green-300' : note.priority === 'Medium' ? 'border-yellow-300': 'border-red-300'}`}>
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
    );
}

export default NoteList;