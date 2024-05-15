import './Note.css';
import { MdPushPin } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
const Note = ({note,id,position,...props}) => {
  
  const handleDeleteNote = (id) => () => {
    
    const notes = JSON.parse(localStorage.getItem("notes"));
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    window.location.reload();
  }

  return (
    <div className='note-container'
    style={{
      left:`${position?.x}px`,
      top:`${position?.y}px`,
    }}
    {...props}
    >
      <MdPushPin id='pin'/>
      <CiCircleRemove id='remove' onClick={handleDeleteNote(id)}/>
      <h5>{note}</h5>
    </div>
  )
}

export default Note
