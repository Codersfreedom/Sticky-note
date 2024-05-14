import './Note.css';
import { MdPushPin } from "react-icons/md";

const Note = () => {
  return (
    <div className='note-container'>
      <MdPushPin id='pin'/>
      <h5>This is a sample note.</h5>
    </div>
  )
}

export default Note
