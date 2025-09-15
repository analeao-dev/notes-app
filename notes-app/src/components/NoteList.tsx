import Badge, { type BadgeVariant } from "./Badge";

type NoteListProps = { notes: NoteType[] };

type NoteType = {
    id: number,
    title: string,
    priority: 'Easy' | 'Medium' | 'Hard',
    category: 'Work' | 'Personal' | 'Ideas',
    description: string
};

const priorityVariantMap: Record<NoteType['priority'], BadgeVariant> = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger'
};

const categoryVariantMap: Record<NoteType['category'], BadgeVariant> = {
    Work: 'primary',
    Personal: 'primary',
    Ideas: 'primary'
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
                                <Badge variant={priorityVariantMap[note.priority]}>
                                    {note.priority}
                                </Badge>
                                <Badge variant={categoryVariantMap[note.category]}>
                                    {note.category}
                                </Badge>
                            </div>
                            <p className="break-words whitespace-pre-wrap">{note.description}</p>
                        </div>
                    ))}
                </div>)
    );
}

export default NoteList;