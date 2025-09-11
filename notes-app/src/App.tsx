import { useState } from "react";
import NoteForm from "./components/NoteForm";

type NoteType = {
  id: number,
  title: string,
  priority: 'Easy' | 'Medium' | 'Hard',
  category: 'Work' | 'Personal' | 'Ideas',
  description: string
};

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  console.log(notes)
  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text=2xl font-bold mb-4 text-center">📝 Notes App</h2>
        <NoteForm notes={notes} setNotes={setNotes} />
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <p>{note.title}</p>
            <p>{note.priority}, {note.category}</p>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </>

  )
}

export default App;