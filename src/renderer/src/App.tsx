import { useState } from 'react'
import './assets/notes.css'

function App(): JSX.Element {
  const [notes, setNotes] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')

  const handleAddNote = (): void => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote])
      setCurrentNote('')
    }
  }

  const handleDeleteNote = (index: number): void => {
    const newNotes = notes.filter((_, i) => i !== index)
    setNotes(newNotes)
  }

  return (
    <div className="notes-container">
      <h1>Not Defteri</h1>

      <div className="note-input">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Notunuzu buraya yazın..."
        />
        <button onClick={handleAddNote}>Not Ekle</button>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note}</p>
            <button onClick={() => handleDeleteNote(index)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
