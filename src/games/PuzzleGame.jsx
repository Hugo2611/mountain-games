import { useState, useEffect } from 'react'
import './PuzzleGame.css'

// Image simple encodée en base64 (montagne stylisée)
const createPuzzleImage = () => {
  const colors = [
    '#667eea', '#764ba2', '#56ab2f', '#a8e063',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a'
  ]
  return colors
}

function PuzzleGame({ onComplete }) {
  const [tiles, setTiles] = useState([])
  const [selectedTile, setSelectedTile] = useState(null)
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Initialiser le puzzle mélangé
    initPuzzle()
  }, [])

  const initPuzzle = () => {
    const colors = createPuzzleImage()
    const shuffled = [...colors].sort(() => Math.random() - 0.5)
    setTiles(shuffled)
    setMoves(0)
    setIsComplete(false)
    setSelectedTile(null)
  }

  const handleTileClick = (index) => {
    if (isComplete) return

    if (selectedTile === null) {
      setSelectedTile(index)
    } else {
      // Échanger les deux tuiles
      const newTiles = [...tiles]
      const temp = newTiles[selectedTile]
      newTiles[selectedTile] = newTiles[index]
      newTiles[index] = temp
      
      setTiles(newTiles)
      setSelectedTile(null)
      setMoves(moves + 1)

      // Vérifier si le puzzle est résolu
      checkComplete(newTiles)
    }
  }

  const checkComplete = (currentTiles) => {
    const original = createPuzzleImage()
    const isSolved = currentTiles.every((tile, index) => tile === original[index])
    
    if (isSolved) {
      setIsComplete(true)
    }
  }

  if (isComplete) {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Puzzle Résolu ! 🧩</h2>
          <div className="puzzle-complete">
            <div className="success-icon">🎉</div>
            <p className="result-message">
              Bravo ! Tu as résolu le puzzle en {moves} coups !
            </p>
            <div className="puzzle-grid solved">
              {tiles.map((color, index) => (
                <div
                  key={index}
                  className="puzzle-tile"
                  style={{ background: color }}
                />
              ))}
            </div>
            <button className="btn-success" onClick={onComplete}>
              Passer au Runner 🏃
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="game-container">
        <h2 className="game-title">Puzzle des Sommets 🧩</h2>
        <p className="game-subtitle">Clique sur 2 cases pour les échanger</p>
        
        <div className="puzzle-info">
          <div className="info-item">
            <span className="info-label">Coups :</span>
            <span className="info-value">{moves}</span>
          </div>
          <button className="btn-secondary" onClick={initPuzzle}>
            🔄 Réinitialiser
          </button>
        </div>

        <div className="puzzle-grid">
          {tiles.map((color, index) => (
            <div
              key={index}
              className={`puzzle-tile ${selectedTile === index ? 'selected' : ''}`}
              style={{ background: color }}
              onClick={() => handleTileClick(index)}
            >
              {selectedTile === index && (
                <div className="selection-indicator">✓</div>
              )}
            </div>
          ))}
        </div>

        <div className="puzzle-hint">
          <p>💡 Astuce : Les couleurs doivent former un dégradé harmonieux</p>
        </div>
      </div>
    </div>
  )
}

export default PuzzleGame
