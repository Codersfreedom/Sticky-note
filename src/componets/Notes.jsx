import { createRef, useEffect, useRef } from "react";
import Note from "./Note"
import './Notes.css';

const Notes = ({ notes = [], setNotes = () => { } }) => {

  const noteRef = useRef([]);


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

  const handleDragStart = (e, note) => {
    const { id } = note;
    const startPos = note.position;
    console.log(startPos)
    const currNote = noteRef.current[id].current;
    const notePosition = currNote.getBoundingClientRect();
    const offsetX = e.clientX - notePosition.left;
    const offsetY = e.clientY - notePosition.top;

    const handleMouseMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      currNote.style.left = `${x}px`;
      currNote.style.top = `${y}px`;

    }
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const finalPos = currNote.getBoundingClientRect();
      const newPos = { x: finalPos.left, y: finalPos.top };

      if (checkOverlap(id)) {
        // check for overlap
        currNote.style.left = `${startPos.x}px`;
        currNote.style.top = `${startPos.y}px`;

      } else {
        const updatedNotes = notes.map((n) => {
          if (n.id === id) {
            return { ...n, position: newPos }
          }
          return n;
        })
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  const checkOverlap = (id) => {
    const currNote = noteRef.current[id].current;
    const currPos = currNote.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) {
        return false;
      }
      const otherNote = noteRef.current[note.id].current;
      const otherPos = otherNote.getBoundingClientRect();

      const overlap = !(
        currPos.right < otherPos.left ||
        currPos.left > otherPos.right ||
        currPos.bottom < otherPos.top ||
        currPos.top > otherPos.bottom
      )
      return overlap;
    })

  }
  return (
    <>
      {notes &&
        notes?.map((note) => {
          return <Note key={note.id}
            ref={noteRef.current[note.id] ?
              noteRef.current[note.id] :
              (noteRef.current[note.id] = createRef())
            }
            position={note.position} note={note.note} id={note.id}
            onMouseDown={(e) => handleDragStart(e, note)}
          />

        })
      }
    </>
  )
}

export default Notes
