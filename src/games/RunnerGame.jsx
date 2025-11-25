import { useState, useEffect, useRef } from 'react'
import './RunnerGame.css'

function RunnerGame({ onComplete }) {
  const [gameState, setGameState] = useState('ready') // ready, playing, won, lost
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [currentLevel, setCurrentLevel] = useState(1)
  const [isShowingSequence, setIsShowingSequence] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [score, setScore] = useState(0)
  const timeoutRef = useRef(null)

  const COLORS = [
    { id: 0, name: 'Rouge', color: '#ef4444', emoji: '🔴' },
    { id: 1, name: 'Bleu', color: '#3b82f6', emoji: '🔵' },
    { id: 2, name: 'Vert', color: '#22c55e', emoji: '🟢' },
    { id: 3, name: 'Jaune', color: '#eab308', emoji: '🟡' }
  ]

  const WIN_LEVEL = 8 // Atteindre le niveau 8 pour gagner

  useEffect(() => {
    if (gameState === 'playing' && currentLevel === 1 && sequence.length === 0) {
      startNewRound()
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [gameState])

  useEffect(() => {
    if (playerSequence.length > 0 && playerSequence.length === sequence.length) {
      checkSequence()
    }
  }, [playerSequence])

  const startNewRound = () => {
    setPlayerSequence([])
    setIsShowingSequence(true)
    
    // Ajouter un nouveau bouton à la séquence
    const newSequence = [...sequence, Math.floor(Math.random() * 4)]
    setSequence(newSequence)
    
    // Montrer la séquence
    playSequence(newSequence)
  }

  const playSequence = async (seq) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(() => {
          setActiveButton(seq[i])
          setTimeout(() => {
            setActiveButton(null)
            resolve()
          }, 400)
        }, 800)
      })
    }
    setIsShowingSequence(false)
  }

  const handleButtonClick = (buttonId) => {
    if (isShowingSequence || gameState !== 'playing') return
    
    setActiveButton(buttonId)
    setTimeout(() => setActiveButton(null), 300)
    
    const newPlayerSequence = [...playerSequence, buttonId]
    setPlayerSequence(newPlayerSequence)
    
    // Vérifier immédiatement si l'utilisateur fait une erreur
    if (sequence[newPlayerSequence.length - 1] !== buttonId) {
      setGameState('lost')
    }
  }

  const checkSequence = () => {
    const isCorrect = playerSequence.every((val, idx) => val === sequence[idx])
    
    if (isCorrect) {
      const newScore = score + currentLevel * 10
      setScore(newScore)
      
      if (currentLevel >= WIN_LEVEL) {
        setGameState('won')
      } else {
        setCurrentLevel(prev => prev + 1)
        setTimeout(() => startNewRound(), 1000)
      }
    } else {
      setGameState('lost')
    }
  }

  const handleStart = () => {
    setGameState('playing')
    setSequence([])
    setPlayerSequence([])
    setCurrentLevel(1)
    setScore(0)
  }

  const handleRestart = () => {
    setGameState('ready')
    setSequence([])
    setPlayerSequence([])
    setCurrentLevel(1)
    setScore(0)
  }

  if (gameState === 'ready') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Simon de la Montagne 🎵</h2>
          <p className="game-subtitle">Mémorise et répète la séquence !</p>
          
          <div className="runner-instructions">
            <h3>Instructions :</h3>
            <ul>
              <li>🎵 Regarde bien la séquence de couleurs</li>
              <li>🧠 Mémorise l'ordre des boutons qui s'allument</li>
              <li>👆 Répète la séquence en cliquant sur les boutons</li>
              <li>📈 Chaque niveau ajoute une couleur</li>
              <li>🏆 Atteins le niveau {WIN_LEVEL} pour gagner !</li>
            </ul>
            <p className="mobile-friendly">✨ Parfait pour jouer sur mobile !</p>
          </div>

          <button className="btn-primary" onClick={handleStart}>
            Commencer le Jeu 🎵
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'won') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Mémoire Parfaite ! 🎵</h2>
          <div className="runner-result">
            <div className="success-icon">🎉</div>
            <p className="result-message">
              Incroyable ! Tu as une mémoire exceptionnelle !
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Niveau atteint :</span>
                <span className="stat-value">{currentLevel}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Score :</span>
                <span className="stat-value">{score}</span>
              </div>
            </div>
            <button className="btn-success" onClick={onComplete}>
              Récupérer ta Carte Cadeau 🎁
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'lost') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Erreur ! 💥</h2>
          <div className="runner-result">
            <div className="fail-icon">❌</div>
            <p className="result-message">
              Mauvaise séquence ! Tu as atteint le niveau {currentLevel}
            </p>
            <p className="retry-hint">Il fallait atteindre le niveau {WIN_LEVEL}...</p>
            <button className="btn-primary" onClick={handleRestart}>
              Réessayer 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="game-container">
        <h2 className="game-title">Simon de la Montagne 🎵</h2>
        
        <div className="runner-hud">
          <div className="hud-item">
            <span className="hud-label">🎯 Niveau :</span>
            <span className="hud-value">{currentLevel} / {WIN_LEVEL}</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">🏆 Score :</span>
            <span className="hud-value">{score}</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">📝 Séquence :</span>
            <span className="hud-value">{playerSequence.length} / {sequence.length}</span>
          </div>
        </div>

        <div className="progress-bar-runner">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentLevel / WIN_LEVEL) * 100}%` }}
          />
        </div>

        {isShowingSequence && (
          <div className="sequence-status">
            👀 Regarde bien la séquence...
          </div>
        )}

        {!isShowingSequence && gameState === 'playing' && (
          <div className="sequence-status active">
            👆 À toi de jouer ! Répète la séquence
          </div>
        )}

        <div className="simon-grid">
          {COLORS.map((color) => (
            <button
              key={color.id}
              className={`simon-button ${activeButton === color.id ? 'active' : ''}`}
              style={{
                backgroundColor: color.color,
                opacity: activeButton === color.id ? 1 : 0.7
              }}
              onClick={() => handleButtonClick(color.id)}
              disabled={isShowingSequence}
            >
              <span className="button-emoji">{color.emoji}</span>
              <span className="button-name">{color.name}</span>
            </button>
          ))}
        </div>

        <p className="runner-hint">
          💡 {isShowingSequence ? 'Mémorise la séquence...' : 'Clique sur les boutons dans le bon ordre !'}
        </p>
      </div>
    </div>
  )
}

export default RunnerGame
