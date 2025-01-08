import { useTheme } from '../context/ThemeContext'
import './SettingsPanel.css'

interface SettingsPanelProps {
  isVisible: boolean
  onToggle: () => void
}

const SettingsPanel = ({ isVisible, onToggle }: SettingsPanelProps): JSX.Element => {
  const { theme, currentTheme, setTheme } = useTheme()

  return (
    <div className={`settings-panel ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button" onClick={onToggle}>
        {isVisible ? '>' : '<'}
      </button>
      <div className="settings-content">
        <h2>Ayarlar</h2>
        <div className="settings-group">
          <label>
            Tema
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
            >
              <option value="system">
                Sistem Teması ({currentTheme === 'dark' ? 'Koyu' : 'Açık'})
              </option>
              <option value="light">Açık</option>
              <option value="dark">Koyu</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
