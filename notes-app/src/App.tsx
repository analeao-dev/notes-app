import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

type NoteType = {
  id: number,
  title: string,
  priority: 'Easy' | 'Medium' | 'Hard',
  category: 'Work' | 'Personal' | 'Ideas',
  description: string
};

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  // "Delete" notes
  const handleDeleteNote = (id: number) => {
    const confirmDelete = window.confirm('Are you sure want to delete this note?');
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  console.log(notes)
  return (
    <div className="max-w-lg mx-auto ">
      <div className="my-10 p-6 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">📝 Notes App</h2>
        <NoteForm notes={notes} setNotes={setNotes} />

        <NoteList notes={notes} deleteNote={handleDeleteNote} />
      </div>



    </div>

  )
}

export default App;