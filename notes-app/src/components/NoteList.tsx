
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
        <div>
            <p className="font-semibold text-xl">{note.title}</p>
            <span className="text-sm px-2 bg-orange-500 rounded-full">{note.priority}</span> <span className="text-sm p-2 bg-orange-50 rounded-full">{note.category}</span>
            <p>{note.description}</p>
        </div>

    );
}

export default NoteList;