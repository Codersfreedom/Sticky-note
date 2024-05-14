import { useState } from "react"
import Notes from "./componets/Notes"
import Searchbar from "./componets/Searchbar"


function App() {

  const [notes,setNotes] = useState([
    {
      id:1,
      text:"Sample note 1",
    },
    {
      id:2,
      text:"Sample note 2"
    }
  ])

  return (
    <>
      <Searchbar/>
      <Notes notes={notes} setNotes={setNotes}/>
    </>
  )
}

export default App
