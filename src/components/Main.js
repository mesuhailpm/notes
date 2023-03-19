import ReactMde from "react-mde"
import Showdown from "showdown"
import ReactMarkdown from 'react-markdown'


export default function Main ({notes,updateNote,currentNoteID,currentNote}){
    console.log('Main component rendered with ',currentNote)

    //console.log('currentNote passed to Main componetn is :', currentNote)

    if (currentNote) {
    return(
           currentNote &&
            <div className='main'>

                <div className="editor">
                    <input type="text"
                        className="note-edit-title"
                        value={currentNote.title}
                        onChange={(event)=>{updateNote(event,"title",currentNote.id)}}>
                    </input>
                    <textarea tecttype="text"
                        className="note-edit-body"
                        value={currentNote.body}
                        onChange={(event)=>{updateNote(event,"body",currentNote.id)}} />


                </div>
                <div className="preview">
                    <h3 className="note-preview-title">{currentNote.title}</h3>
                    <p className="note-preview-body"><ReactMarkdown>{currentNote.body}</ReactMarkdown></p>

                </div>


        </div>

    )
}
}
