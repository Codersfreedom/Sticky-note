import { useEffect } from "react";
import Note from "./Note"
import './Notes.css';

const Notes = ({ notes = [], setNotes = () => { } }) => {



  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes?.map((note) => {
      const savedNote = savedNotes?.find((sn) => sn.id === note.id);

      if (savedNote) {

        return { ...note, position: savedNote?.position };
      } else {
        const position = determinePosition();

        return { ...note, position };
      }
    })
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes?.length])

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
      {notes &&
        notes?.map((note) => {
          return <Note key={note.id} position={note.position} note={note.note} />

        })
      }
    </div>
  )
}

export default Notes
