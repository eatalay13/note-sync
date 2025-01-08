import { useRef } from 'react'
import './MarkdownEditor.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  isSettingsVisible: boolean
}

const MarkdownEditor = ({
  value,
  onChange,
  isSettingsVisible
}: MarkdownEditorProps): JSX.Element => {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className={`markdown-editor ${isSettingsVisible ? 'with-settings' : ''}`}>
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Markdown içeriğinizi buraya yazın..."
      />
    </div>
  )
}

export default MarkdownEditor
