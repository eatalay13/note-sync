import { useEffect, useRef, useState } from 'react'
import './assets/notes.css'

function App(): JSX.Element {
  const [notes, setNotes] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Textarea'ya focus'u yönlendiren yardımcı fonksiyon
  const focusTextarea = (): void => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleAddNote = (): void => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote])
      setCurrentNote('')
      focusTextarea() // Not ekledikten sonra focus'u textarea'ya yönlendir
    }
  }

  const handleDeleteNote = (index: number): void => {
    const onayla = window.confirm('Bu notu silmek istediğinizden emin misiniz?')
    if (onayla) {
      const newNotes = notes.filter((_, i) => i !== index)
      setNotes(newNotes)
      focusTextarea() // Not sildikten sonra focus'u textarea'ya yönlendir
    }
  }

  // Sayfa yüklendiğinde textarea'ya focus'u yönlendir
  useEffect(() => {
    focusTextarea()
  }, [])

  return (
    <div className="notes-container">
      <h1>Not Defteri</h1>

      <div className="note-input">
        <textarea
          ref={textareaRef}
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
