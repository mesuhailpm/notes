export default function Sidebar({notes,addNote,currentNote,selectNote,currentNoteID,deleteNote}){

    //const sortedNotes = [...notes].sort((a,b)=> a.time - b.time);
    // console.log('sortedNotes')
    // console.log(sortedNotes)

    const sortedNotes = notes.sort((a,b)=> new Date(b.time).getTime() - new Date(a.time).getTime());

    console.log("Sorted elemetns:");console.log(sortedNotes)
    return(
        <div className='pane sidebar'>
            <div className="pane-title-container">
                <h3 className="pane-title">Notes</h3>
                <button className="pane-title-button" onClick={addNote}><i class="gg-add-r"></i> </button>
            </div>

            <div className="pane-notes-container">

                {sortedNotes.map((note, index) => {
                return(
                    <div className={`note-snippet ${note.id===currentNoteID && 'active'}`} key={`${index}${note.id}`} onClick={()=>selectNote(note.id)}>
                        <div className="note-snippet-left">
                            <p className="note-snippet-title">{note.title}</p>
                            <p className="note-snippet-text">{note.body.split("\n")[0]}</p>
                            <p className="note-snippet-time">Last modified: { new Date(note.time).toLocaleString("en-GB", {
                                dateStyle:"short",
                                timeStyle:"short" }
                                )}   </p>
                        </div>
                        <div className="note-snippet-right">
                                <button
                                    className="delete-btn"
                                    onClick={(event)=>deleteNote(event,note.id)}
                                >
                                    <i className="gg-trash trash-icon"></i>
                                </button>
                        </div>

                    </div>)
                }
                )}
            </div>

        </div>

    )
}
