import { useEffect, useState } from "react"
import Notes from "./componets/Notes"
import Searchbar from "./componets/Searchbar"


function App() {

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const getNotes = (note) => {
    if (!note) {
      return;
    }
    else {

      if (notes.length > 0) {

        setNotes([...notes, note]);
      } else {
        setNotes([note]);
      }
    }

  }

  return (
    <>
      <Searchbar parentCallback={getNotes} />
      <Notes notes={notes} setNotes={setNotes} />
    </>
  )
}

export default App
