import { useState, useEffect, useRef } from 'react'
import './RunnerGame.css'

function RunnerGame({ onComplete }) {
  const [gameState, setGameState] = useState('ready') // ready, playing, won, lost
  const [playerY, setPlayerY] = useState(250) // Position verticale du joueur
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState([])
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(0)
  const gameLoopRef = useRef(null)
  const obstacleIntervalRef = useRef(null)

  const GROUND_Y = 250
  const JUMP_HEIGHT = 120
  const PLAYER_SIZE = 40
  const OBSTACLE_WIDTH = 30
  const OBSTACLE_HEIGHT = 40
  const GAME_WIDTH = 700
  const WIN_TIME = 20 // 20 secondes pour gagner

  useEffect(() => {
    if (gameState === 'playing') {
      startGame()
    } else {
      stopGame()
    }

    return () => stopGame()
  }, [gameState])

  // Gestion du saut avec clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && gameState === 'playing') {
        jump()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, isJumping])

  const startGame = () => {
    setTimer(0)
    setScore(0)
    setObstacles([])
    setPlayerY(GROUND_Y)
    setIsJumping(false)

    // Boucle principale du jeu
    gameLoopRef.current = setInterval(() => {
      setTimer(prev => {
        const newTime = prev + 0.1
        if (newTime >= WIN_TIME) {
          setGameState('won')
        }
        return newTime
      })

      // Déplacer les obstacles
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, x: obs.x - 5 }))
          .filter(obs => obs.x > -OBSTACLE_WIDTH)
        
        return updated
      })

      setScore(prev => prev + 1)
    }, 50)

    // Créer des obstacles
    obstacleIntervalRef.current = setInterval(() => {
      setObstacles(prev => [...prev, {
        x: GAME_WIDTH,
        y: GROUND_Y,
        id: Date.now()
      }])
    }, 2000)
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

  const jump = () => {
    if (isJumping) return

    setIsJumping(true)
    
    // Animation de saut
    let jumpY = GROUND_Y
    let velocity = -15
    const gravity = 1

    const jumpInterval = setInterval(() => {
      velocity += gravity
      jumpY += velocity

      if (jumpY >= GROUND_Y) {
        jumpY = GROUND_Y
        setPlayerY(GROUND_Y)
        setIsJumping(false)
        clearInterval(jumpInterval)
      } else {
        setPlayerY(jumpY)
      }
    }, 20)
  }

  // Détection de collision
  useEffect(() => {
    if (gameState !== 'playing') return

    const playerX = 50
    const playerBottom = playerY + PLAYER_SIZE

    for (let obstacle of obstacles) {
      const obsRight = obstacle.x + OBSTACLE_WIDTH
      const obsLeft = obstacle.x
      const obsTop = obstacle.y

      // Vérifier collision
      if (
        playerX + PLAYER_SIZE > obsLeft &&
        playerX < obsRight &&
        playerBottom > obsTop
      ) {
        setGameState('lost')
        break
      }
    }
  }, [obstacles, playerY, gameState])

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
          <h2 className="game-title">Runner du Trail 🏃</h2>
          <p className="game-subtitle">Survie pendant 20 secondes !</p>
          
          <div className="runner-instructions">
            <h3>Instructions :</h3>
            <ul>
              <li>🏃 Le coureur avance automatiquement</li>
              <li>⬆️ Appuie sur <kbd>ESPACE</kbd> ou clique pour sauter</li>
              <li>🚧 Évite les obstacles pendant 20 secondes</li>
              <li>⏱️ Survie à tout le parcours pour gagner !</li>
            </ul>
          </div>

          <button className="btn-primary" onClick={handleStart}>
            Démarrer le Trail 🏃
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'won') {
    return (
      <div className="container">
        <div className="game-container">
          <h2 className="game-title">Trail Complété ! 🏃</h2>
          <div className="runner-result">
            <div className="success-icon">🎉</div>
            <p className="result-message">
              Incroyable ! Tu as survécu {timer.toFixed(1)} secondes !
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Temps :</span>
                <span className="stat-value">{timer.toFixed(1)}s</span>
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
          <h2 className="game-title">Game Over 💥</h2>
          <div className="runner-result">
            <div className="fail-icon">❌</div>
            <p className="result-message">
              Tu as percuté un obstacle ! Temps survécu : {timer.toFixed(1)}s
            </p>
            <p className="retry-hint">Il fallait tenir 20 secondes...</p>
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
        <h2 className="game-title">Runner du Trail 🏃</h2>
        
        <div className="runner-hud">
          <div className="hud-item">
            <span className="hud-label">⏱️ Temps :</span>
            <span className="hud-value">{timer.toFixed(1)}s / {WIN_TIME}s</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">📊 Score :</span>
            <span className="hud-value">{score}</span>
          </div>
        </div>

        <div className="progress-bar-runner">
          <div 
            className="progress-fill" 
            style={{ width: `${(timer / WIN_TIME) * 100}%` }}
          />
        </div>

        <div className="game-canvas" onClick={jump}>
          {/* Sol */}
          <div className="ground" />
          
          {/* Joueur */}
          <div
            className="player"
            style={{
              left: '50px',
              bottom: `${300 - playerY - PLAYER_SIZE}px`
            }}
          >
            🏃
          </div>

          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                bottom: '0px'
              }}
            />
          ))}
        </div>

        <p className="runner-hint">
          💡 Appuie sur <kbd>ESPACE</kbd> ou clique pour sauter
        </p>
      </div>
    </div>
  )
}

export default RunnerGame
