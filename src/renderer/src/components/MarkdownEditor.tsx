import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div
      className={`markdown-editor ${isSettingsVisible ? 'with-settings' : ''}`}
    >
      <div className="editor-header">
        <button
          className="icon-button"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? '👁️' : '✏️'}
        </button>
      </div>
      {isPreview ? (
        <div className="markdown-preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          ref={editorRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Markdown içeriğinizi buraya yazın..."
        />
      )}
    </div>
  )
}

export default MarkdownEditor
