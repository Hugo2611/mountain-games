import { useState, useEffect, useRef } from 'react'
import './RunnerGame.css'

function RunnerGame({ onComplete }) {
  const [gameState, setGameState] = useState('ready') // ready, playing, won, lost
  const [playerX, setPlayerX] = useState(1) // Position horizontale (0=gauche, 1=centre, 2=droite)
  const [obstacles, setObstacles] = useState([])
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(0)
  const [distance, setDistance] = useState(0)
  const gameLoopRef = useRef(null)
  const obstacleIntervalRef = useRef(null)

  const LANES = 3 // 3 pistes (gauche, centre, droite)
  const PLAYER_SIZE = 50
  const OBSTACLE_SIZE = 50
  const GAME_HEIGHT = 400
  const WIN_TIME = 25 // 25 secondes pour gagner
  const WIN_DISTANCE = 500 // Distance à parcourir

  useEffect(() => {
    if (gameState === 'playing') {
      startGame()
    } else {
      stopGame()
    }

    return () => stopGame()
  }, [gameState])

  // Gestion des déplacements gauche-droite
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'q' || e.key === 'Q') {
        moveLeft()
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, playerX])

  const startGame = () => {
    setTimer(0)
    setScore(0)
    setDistance(0)
    setObstacles([])
    setPlayerX(1) // Commence au centre

    // Boucle principale du jeu
    gameLoopRef.current = setInterval(() => {
      setTimer(prev => {
        const newTime = prev + 0.1
        if (newTime >= WIN_TIME) {
          setGameState('won')
        }
        return newTime
      })

      setDistance(prev => {
        const newDist = prev + 2
        if (newDist >= WIN_DISTANCE) {
          setGameState('won')
        }
        return newDist
      })

      // Déplacer les obstacles vers le bas (effet de descente)
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, y: obs.y + 5 }))
          .filter(obs => obs.y < GAME_HEIGHT + 50)
        
        return updated
      })

      setScore(prev => prev + 1)
    }, 50)

    // Créer des obstacles aléatoires
    obstacleIntervalRef.current = setInterval(() => {
      const randomLane = Math.floor(Math.random() * LANES)
      setObstacles(prev => [...prev, {
        lane: randomLane,
        y: -50,
        id: Date.now()
      }])
    }, 1500)
  }

  const stopGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
      gameLoopRef.current = null
    }
    if (obstacleIntervalRef.current) {
      clearInterval(obstacleIntervalRef.current)
      obstacleIntervalRef.current = null
    }
  }

  const moveLeft = () => {
    setPlayerX(prev => Math.max(0, prev - 1))
  }

  const moveRight = () => {
    setPlayerX(prev => Math.min(LANES - 1, prev + 1))
  }

  // Détection de collision
  useEffect(() => {
    if (gameState !== 'playing') return

    const playerBottom = GAME_HEIGHT - 80 // Position du joueur

    for (let obstacle of obstacles) {
      // Vérifier si l'obstacle est à la hauteur du joueur
      if (obstacle.y >= playerBottom - 30 && obstacle.y <= playerBottom + 30) {
        // Vérifier si dans la même lane
        if (obstacle.lane === playerX) {
          setGameState('lost')
          break
        }
      }
    }
  }, [obstacles, playerX, gameState])

  const handleStart = () => {
    setGameState('playing')
  }

  const handleRestart = () => {
    setGameState('ready')
  }

  if (gameState === 'ready') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Descente de Ski ⛷️</h2>
          <p className="game-subtitle">Dévale la pente et évite les obstacles !</p>
          
          <div className="runner-instructions">
            <h3>Instructions :</h3>
            <ul>
              <li>⛷️ Tu descends automatiquement la piste</li>
              <li>⬅️ Flèche GAUCHE ou A/Q pour aller à gauche</li>
              <li>➡️ Flèche DROITE ou D pour aller à droite</li>
              <li>🌲 Évite les arbres et obstacles</li>
              <li>🏁 Survie pendant {WIN_TIME} secondes pour gagner !</li>
            </ul>
          </div>

          <button className="btn-primary" onClick={handleStart}>
            Démarrer la Descente ⛷️
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'won') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Descente Réussie ! ⛷️</h2>
          <div className="runner-result">
            <div className="success-icon">🎉</div>
            <p className="result-message">
              Incroyable ! Tu as dévalé la piste avec succès !
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Temps :</span>
                <span className="stat-value">{timer.toFixed(1)}s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Distance :</span>
                <span className="stat-value">{distance}m</span>
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
          <h2 className="game-title">Chute ! 💥</h2>
          <div className="runner-result">
            <div className="fail-icon">❌</div>
            <p className="result-message">
              Tu as percuté un obstacle ! Distance : {distance}m
            </p>
            <p className="retry-hint">Il fallait tenir {WIN_TIME} secondes...</p>
            <button className="btn-primary" onClick={handleRestart}>
              Réessayer 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  const lanePositions = [16.6, 50, 83.4] // Positions en % pour 3 pistes

  return (
    <div className="container">
      <div className="game-container">
        <h2 className="game-title">Descente de Ski ⛷️</h2>
        
        <div className="runner-hud">
          <div className="hud-item">
            <span className="hud-label">⏱️ Temps :</span>
            <span className="hud-value">{timer.toFixed(1)}s / {WIN_TIME}s</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">📏 Distance :</span>
            <span className="hud-value">{distance}m</span>
          </div>
        </div>

        <div className="progress-bar-runner">
          <div 
            className="progress-fill" 
            style={{ width: `${(timer / WIN_TIME) * 100}%` }}
          />
        </div>

        <div className="ski-canvas">
          {/* Pistes */}
          <div className="ski-lane" style={{ left: '16.6%' }} />
          <div className="ski-lane" style={{ left: '50%' }} />
          <div className="ski-lane" style={{ left: '83.4%' }} />
          
          {/* Joueur (skieur) */}
          <div
            className="ski-player"
            style={{
              left: `${lanePositions[playerX]}%`,
              bottom: '80px'
            }}
          >
            ⛷️
          </div>

          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="ski-obstacle"
              style={{
                left: `${lanePositions[obstacle.lane]}%`,
                top: `${obstacle.y}px`
              }}
            >
              🌲
            </div>
          ))}
        </div>

        <div className="ski-controls">
          <button className="btn-control" onClick={moveLeft}>⬅️</button>
          <span className="control-hint">Utilise les flèches ou A/D</span>
          <button className="btn-control" onClick={moveRight}>➡️</button>
        </div>

        <p className="runner-hint">
          💡 Utilise les <kbd>←</kbd> <kbd>→</kbd> ou <kbd>A</kbd> <kbd>D</kbd> pour te déplacer
        </p>
      </div>
    </div>
  )
}

export default RunnerGame
