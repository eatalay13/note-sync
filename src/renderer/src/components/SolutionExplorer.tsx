import { useState } from 'react'
import './SolutionExplorer.css'

const SolutionExplorer = (): JSX.Element => {
  const [files] = useState<string[]>([
    'README.md',
    'docs/getting-started.md',
    'docs/api-reference.md'
  ])

  return (
    <div className="solution-explorer">
      <h2>Solution Explorer</h2>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <span className="file-icon">📄</span>
            {file}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SolutionExplorer
