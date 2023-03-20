import './App.css';
import {nanoid} from 'nanoid'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react';


export default function App() {
	const [notes,setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteID, setCurrentNoteId] = useState(notes[0]?notes[0].id:"")
  const [currentNote,setCurrentNote] = useState({})
  const [trigger,setTrigger] = useState(false)
  const [idToBeDeleted,setIdToBeDeleted] =useState(null)
  console.log(localStorage.notes)

  useEffect(()=>
  {setCurrentNote(findCurrentNote())},[currentNoteID,notes])
  useEffect(()=>{localStorage.setItem("notes",JSON.stringify(notes))},[notes])

  function clearNotes(){
    setNotes([])
  }
  function selectNote(id){
    //console.log('clicked on note id'+id)
    setCurrentNoteId(id)
  }
  function handleDelete(event,idToDelete){
    event.stopPropagation()
    setIdToBeDeleted(idToDelete)
    setTimeout(()=>
    {setTrigger(!trigger)},200)
  }

  function confirmDelete(){
    // console.log(event,idToDelete)
    setNotes(notes.filter(note=> note.id!=idToBeDeleted))
    setTrigger(!trigger)
  }

  function addNote(){
    const newNote={id:nanoid(),title:'Untitled',body:'Replace me with your note',
    time: new Date().toISOString()
  }
    setNotes(prevNotes=>[newNote,...prevNotes])
    setCurrentNoteId(newNote.id)
  }
  //whatever note returned is our currentNote
  function findCurrentNote(){
     return notes.find(note =>
      note.id===currentNoteID)
  }


  //console.log(currentNoteID)

  function updateNote(event,prop,idtoUpdate){
     console.log(idtoUpdate,'is to be updated')

    setNotes(prevNotes => prevNotes.map(note=>{
                               return note.id===idtoUpdate ?
                                   {...note,
                                    [prop]:event.target.value,
                                    time: new Date().toISOString()}
                                  : note
                                    }    )
    )
  }

  console.log(currentNote)
  return (
    <div className="App">

    {notes.length ?
      <div className="second-page">

          <Sidebar
            notes={notes}
            addNote={addNote}
            currentNote={currentNote}
            selectNote={selectNote}
            currentNoteID={currentNoteID}
            confirmDelete={confirmDelete}
            handleDelete={handleDelete}
            />

          <Main
            notes={notes}
            updateNote={updateNote}
            currentNoteID={currentNoteID}
            currentNote={currentNote}
            />

          {trigger &&
          <div id='popup'
          // trigger={trigger}
          // setTrigger={setTrigger}
        >
            <div className="popup">
              <div className="popup-container">
                <div className="popup-text">Do you want to delete the note? it can't be undone</div>
                <button className="popup-button" onClick={confirmDelete}>Yes</button>
                <button className="popup-button" onClick={()=>setTrigger(!trigger)}>No</button>
              </div>
            </div>

          </div>}



      </div>

		 :
     <div className='first-page-container'>
        <div className="container">
          <div className="empty-notes">
            <p>You have no notes</p>
          </div>
          <button className="start-button" onClick={addNote}>Create one</button>
        </div>
      </div>




  }

    </div>
  );
}
