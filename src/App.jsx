import { useState } from 'react'
import HomePage from './components/HomePage'
import ProgressBar from './components/ProgressBar'
import QuizGame from './games/QuizGame'
import PuzzleGame from './games/PuzzleGame'
import RunnerGame from './games/RunnerGame'
import GiftCard from './components/GiftCard'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home') // home, game1, game2, game3, gift
  const [progress, setProgress] = useState({
    quiz: false,
    puzzle: false,
    runner: false
  })

  const handleGameComplete = (gameName) => {
    setProgress(prev => ({ ...prev, [gameName]: true }))
    
    // Navigation automatique vers le prochain jeu ou la carte cadeau
    if (gameName === 'quiz') {
      setCurrentScreen('game2')
    } else if (gameName === 'puzzle') {
      setCurrentScreen('game3')
    } else if (gameName === 'runner') {
      setCurrentScreen('gift')
    }
  }

  const startGames = () => {
    setCurrentScreen('game1')
  }

  const resetGames = () => {
    setProgress({ quiz: false, puzzle: false, runner: false })
    setCurrentScreen('home')
  }

  return (
    <div className="app">
      {currentScreen !== 'home' && currentScreen !== 'gift' && (
        <ProgressBar progress={progress} />
      )}
      
      {currentScreen === 'home' && <HomePage onStart={startGames} />}
      
      {currentScreen === 'game1' && (
        <QuizGame onComplete={() => handleGameComplete('quiz')} />
      )}
      
      {currentScreen === 'game2' && (
        <PuzzleGame onComplete={() => handleGameComplete('puzzle')} />
      )}
      
      {currentScreen === 'game3' && (
        <RunnerGame onComplete={() => handleGameComplete('runner')} />
      )}
      
      {currentScreen === 'gift' && (
        <GiftCard onReset={resetGames} />
      )}
    </div>
  )
}

export default App
