import './Note.css';
import { MdPushPin } from "react-icons/md";

const Note = ({note,position,...props}) => {
  
  return (
    <div className='note-container'
    style={{
      left:`${position?.x}px`,
      top:`${position?.y}px`,
    }}
    {...props}
    >
      <MdPushPin id='pin'/>
      <h5>{note}</h5>
    </div>
  )
}

export default Note
