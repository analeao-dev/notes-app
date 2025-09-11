
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
            <p>{note.title}</p>
            <p>{note.priority}, {note.category}</p>
            <p>{note.description}</p>
        </div>

    );
}

export default NoteList;