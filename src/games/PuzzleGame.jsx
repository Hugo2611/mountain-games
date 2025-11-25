import { useState, useEffect, useRef } from 'react'
import './PuzzleGame.css'

function PuzzleGame({ onComplete }) {
  const [gameState, setGameState] = useState('ready') // ready, playing, won, lost
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [target, setTarget] = useState({ x: 50, y: 50, id: 0 })
  const [missedClicks, setMissedClicks] = useState(0)
  const gameAreaRef = useRef(null)
  const timerRef = useRef(null)

  const TARGETS_TO_WIN = 15
  const MAX_MISSED = 5
  const GAME_TIME = 30

  useEffect(() => {
    if (gameState === 'playing') {
      startGame()
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_TIME)
    setMissedClicks(0)
    generateNewTarget()

    // Timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          setGameState('lost')
          return 0
        }
        return prev - 0.1
      })
    }, 100)
  }

  const generateNewTarget = () => {
    const x = Math.random() * 80 + 5 // 5-85%
    const y = Math.random() * 80 + 5
    setTarget({ x, y, id: Date.now() })
  }

  const handleTargetClick = (e) => {
    e.stopPropagation()
    const newScore = score + 1
    setScore(newScore)

    if (newScore >= TARGETS_TO_WIN) {
      setGameState('won')
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      generateNewTarget()
    }
  }

  const handleMissedClick = () => {
    if (gameState !== 'playing') return
    
    const newMissed = missedClicks + 1
    setMissedClicks(newMissed)

    if (newMissed >= MAX_MISSED) {
      setGameState('lost')
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  if (gameState === 'ready') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Jeu de Réflexes 🎯</h2>
          <p className="game-subtitle">Teste ta rapidité !</p>
          
          <div className="reflex-instructions">
            <h3>Instructions :</h3>
            <ul>
              <li>🎯 Clique sur les cibles qui apparaissent</li>
              <li>⏱️ Tu as 30 secondes</li>
              <li>🎖️ Objectif : {TARGETS_TO_WIN} cibles</li>
              <li>❌ Maximum {MAX_MISSED} clics ratés</li>
            </ul>
            <p className="warning">⚠️ Ne clique pas à côté des cibles !</p>
          </div>

          <button className="btn-primary" onClick={() => setGameState('playing')}>
            Commencer 🎯
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'won') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Réflexes Incroyables ! 🎯</h2>
          <div className="reflex-result">
            <div className="success-icon">🎉</div>
            <p className="result-message">
              Excellent ! Tu as touché {TARGETS_TO_WIN} cibles !
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Temps restant :</span>
                <span className="stat-value">{timeLeft.toFixed(1)}s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Clics ratés :</span>
                <span className="stat-value">{missedClicks}/{MAX_MISSED}</span>
              </div>
            </div>
            <button className="btn-success" onClick={onComplete}>
              Passer au Runner 🏃
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
          <h2 className="game-title">Temps écoulé ! ⏰</h2>
          <div className="reflex-result">
            <div className="fail-icon">❌</div>
            <p className="result-message">
              {missedClicks >= MAX_MISSED 
                ? `Trop de clics ratés ! (${missedClicks}/${MAX_MISSED})`
                : `Tu as touché ${score} cibles sur ${TARGETS_TO_WIN}`}
            </p>
            <button className="btn-primary" onClick={() => setGameState('ready')}>
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
        <h2 className="game-title">Jeu de Réflexes 🎯</h2>
        
        <div className="reflex-hud">
          <div className="hud-item">
            <span className="hud-label">🎯 Cibles :</span>
            <span className="hud-value">{score}/{TARGETS_TO_WIN}</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">⏱️ Temps :</span>
            <span className="hud-value">{timeLeft.toFixed(1)}s</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">❌ Ratés :</span>
            <span className="hud-value">{missedClicks}/{MAX_MISSED}</span>
          </div>
        </div>

        <div className="progress-bar-reflex">
          <div 
            className="progress-fill" 
            style={{ width: `${(score / TARGETS_TO_WIN) * 100}%` }}
          />
        </div>

        <div 
          ref={gameAreaRef}
          className="reflex-game-area" 
          onClick={handleMissedClick}
        >
          <div
            key={target.id}
            className="reflex-target"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`
            }}
            onClick={handleTargetClick}
          >
            🎯
          </div>
        </div>

        <p className="reflex-hint">
          💡 Clique rapidement sur les cibles ! Évite de cliquer à côté !
        </p>
      </div>
    </div>
  )
}

export default PuzzleGame
