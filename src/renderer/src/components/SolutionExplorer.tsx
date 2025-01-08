import { FilePlus, FolderPlus } from 'lucide-react'
import { useState } from 'react'
import './SolutionExplorer.css'

interface File {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: File[]
}

const initialFiles: File[] = [
  {
    id: '1',
    name: 'Klasör 1',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Yeni Not 1.md', type: 'file' },
      { id: '1-2', name: 'Yeni Not 2.md', type: 'file' }
    ]
  },
  {
    id: '2',
    name: 'Klasör 2',
    type: 'folder',
    children: []
  },
  { id: '3', name: 'README.md', type: 'file' }
]

const SolutionExplorer = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = useState<string | null>(null)

  const toggleFolder = (folderId: string): void => {
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const findAndRemoveFile = (
    items: File[],
    id: string
  ): [File | null, File[]] => {
    let removedItem: File | null = null
    const newItems = items.filter((item) => {
      if (item.id === id) {
        removedItem = item
        return false
      }
      if (item.children) {
        const [removed, newChildren] = findAndRemoveFile(item.children, id)
        if (removed) {
          removedItem = removed
          item.children = newChildren
        }
      }
      return true
    })
    return [removedItem, newItems]
  }

  const addFileToFolder = (
    items: File[],
    folderId: string,
    newItem: File
  ): File[] => {
    return items.map((item) => {
      if (item.id === folderId && item.type === 'folder') {
        return {
          ...item,
          children: [...(item.children || []), newItem]
        }
      }
      if (item.children) {
        return {
          ...item,
          children: addFileToFolder(item.children, folderId, newItem)
        }
      }
      return item
    })
  }

  const handleDragStart = (e: React.DragEvent, id: string): void => {
    setDraggedItem(id)
    e.dataTransfer.setData('text/plain', id)
  }

  const handleDragOver = (e: React.DragEvent, id: string): void => {
    e.preventDefault()
    setDragOverItem(id)
  }

  const handleDrop = (e: React.DragEvent, targetId: string): void => {
    e.preventDefault()
    setDragOverItem(null)

    if (!draggedItem || draggedItem === targetId) return

    const [removedItem, newFiles] = findAndRemoveFile(files, draggedItem)
    if (removedItem) {
      const updatedFiles = addFileToFolder(newFiles, targetId, removedItem)
      setFiles(updatedFiles)
      // Hedef klasörü otomatik olarak aç
      setExpandedFolders((prev) => new Set([...prev, targetId]))
    }
  }

  const renderFiles = (files: File[]): JSX.Element[] => {
    return files.map((file) => (
      <div
        key={file.id}
        className={`file-item ${file.type} ${expandedFolders.has(file.id) ? 'expanded' : ''} ${dragOverItem === file.id ? 'drag-over' : ''}`}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, file.id)}
        onDragOver={(e) => file.type === 'folder' && handleDragOver(e, file.id)}
        onDragLeave={() => setDragOverItem(null)}
        onDrop={(e) => file.type === 'folder' && handleDrop(e, file.id)}
      >
        <div
          className="file-content"
          onClick={() => file.type === 'folder' && toggleFolder(file.id)}
        >
          <span className="file-icon">
            {file.type === 'folder'
              ? expandedFolders.has(file.id)
                ? '📂'
                : '📁'
              : '📄'}
          </span>
          <span className="file-name">{file.name}</span>
        </div>
        {file.type === 'folder' &&
          file.children &&
          expandedFolders.has(file.id) && (
            <div className="nested-files">{renderFiles(file.children)}</div>
          )}
      </div>
    ))
  }

  const addFolder = (): void => {
    const newFolder: File = {
      id: `folder-${Date.now()}`,
      name: 'Yeni Klasör',
      type: 'folder',
      children: []
    }
    setFiles([...files, newFolder])
  }

  const addNote = (): void => {
    const newNote: File = {
      id: `note-${Date.now()}`,
      name: 'Yeni Not.md',
      type: 'file'
    }
    setFiles([...files, newNote])
  }

  return (
    <div className="solution-explorer">
      <div className="action-buttons">
        <button onClick={addFolder} title="Yeni Klasör Ekle">
          <FolderPlus size={20} />
        </button>
        <button onClick={addNote} title="Yeni Not Ekle">
          <FilePlus size={20} />
        </button>
      </div>
      <div className="file-list">{renderFiles(files)}</div>
    </div>
  )
}

export default SolutionExplorer
