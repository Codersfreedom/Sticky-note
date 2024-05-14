import { useEffect } from "react";
import Note from "./Note"
import './Notes.css';

const Notes = ({ notes=[], setNotes = () => {} }) => {


  useEffect(() => {
    const savedNotes = null;

    const updatedNotes = notes.map((note) => {

      if (savedNotes) {
        return;
      } else {
        const position = determinePosition();
        return { ...note, position };
      }
    })
    setNotes(updatedNotes);
  }, [notes.length])

  const determinePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    }

  }
  return (
    <div className="notes-container">
      {
        notes.map((note) => {
          return <Note key={note.id} position={note.position} note={note.text} />

        })
      }
    </div>
  )
}

export default Notes
