import { IoMdAddCircleOutline } from "react-icons/io";
import './Searchbar.css';
import { useRef, useState } from "react";
import { nanoid } from 'nanoid'
const Searchbar = ({parentCallback}) => {

    


    const [notes, setNotes] = useState();

    const inputRef = useRef();

    const handleSubmitNote = () => {

        const note = inputRef.current.value;
        if (note == '') {
            return alert("Type something to add note");
        }
        const createdNote = {
            id: nanoid(5),
            note: note,
            isCompleted: false,
        }
        setNotes(createdNote);
        parentCallback(createdNote);
        inputRef.current.value = '';

    }

    return (

        <div className="search-container">

            <input type="text" placeholder="Add note..."
                ref={inputRef}
            />

            <IoMdAddCircleOutline id="add-btn"
                onClick={handleSubmitNote}
            />

        </div>
    )
}

export default Searchbar
