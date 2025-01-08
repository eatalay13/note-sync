import { useState } from 'react'
import './assets/notes.css'
import MarkdownEditor from './components/MarkdownEditor'
import SettingsPanel from './components/SettingsPanel'
import SolutionExplorer from './components/SolutionExplorer'
import StatusBar from './components/StatusBar'
import TitleBar from './components/TitleBar'

function App(): JSX.Element {
  const [markdownContent, setMarkdownContent] = useState('')
  const [isSettingsVisible, setIsSettingsVisible] = useState(true)

  const toggleSettings = (): void => {
    setIsSettingsVisible(!isSettingsVisible)
  }

  return (
    <div className="app-container">
      <TitleBar onToggleSettings={toggleSettings} />
      <div className="main-content">
        <SolutionExplorer />
        <MarkdownEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          isSettingsVisible={isSettingsVisible}
        />
        <SettingsPanel
          isVisible={isSettingsVisible}
          onToggle={toggleSettings}
        />
      </div>
      <StatusBar />
    </div>
  )
}

export default App
