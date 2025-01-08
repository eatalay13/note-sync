import { useState } from 'react'
import './TitleBar.css'

interface MenuItem {
  label: string
  submenu?: { label: string; action?: () => void }[]
}

const TitleBar = ({ onToggleSettings }: { onToggleSettings: () => void }): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const menuItems: MenuItem[] = [
    {
      label: 'Dosya',
      submenu: [
        { label: 'Yeni Not', action: () => console.log('Yeni Not') },
        { label: 'Tümünü Kaydet', action: () => console.log('Tümünü Kaydet') },
        { label: 'Çıkış', action: () => window.electron.ipcRenderer.send('quit-app') }
      ]
    },
    {
      label: 'Düzenle',
      submenu: [
        { label: 'Geri Al', action: () => console.log('Geri Al') },
        { label: 'İleri Al', action: () => console.log('İleri Al') },
        { label: 'Kes', action: () => console.log('Kes') },
        { label: 'Kopyala', action: () => console.log('Kopyala') },
        { label: 'Yapıştır', action: () => console.log('Yapıştır') }
      ]
    }
  ]

  const handleMenuClick = (label: string): void => {
    setActiveMenu(activeMenu === label ? null : label)
  }

  const handleMenuItemClick = (action?: () => void): void => {
    if (action) {
      action()
    }
    setActiveMenu(null)
  }

  return (
    <div className="title-bar">
      <div className="menu-bar">
        {menuItems.map((item) => (
          <div key={item.label} className="menu-item">
            <div
              className={`menu-label ${activeMenu === item.label ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.label)}
            >
              {item.label}
            </div>
            {activeMenu === item.label && item.submenu && (
              <div className="submenu">
                {item.submenu.map((subItem) => (
                  <div
                    key={subItem.label}
                    className="submenu-item"
                    onClick={() => handleMenuItemClick(subItem.action)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="window-controls">
        <button className="window-control settings" onClick={onToggleSettings}>
          ⚙️
        </button>
        <button
          className="window-control minimize"
          onClick={() => window.electron.ipcRenderer.send('minimize-window')}
        >
          -
        </button>
        <button
          className="window-control maximize"
          onClick={() => window.electron.ipcRenderer.send('maximize-window')}
        >
          □
        </button>
        <button
          className="window-control close"
          onClick={() => window.electron.ipcRenderer.send('close-window')}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default TitleBar
