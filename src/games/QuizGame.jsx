import { useState } from 'react'
import './QuizGame.css'

const questions = [
  {
    question: "Quelle est la plus haute montagne d'Europe occidentale ?",
    options: ["Le Mont Blanc", "Le Cervin", "L'Eiger", "Le Mont Rose"],
    correct: 0
  },
  {
    question: "Quel équipement est essentiel pour le ski de randonnée ?",
    options: ["Des lunettes de soleil", "Des peaux de phoque", "Un parapluie", "Un GPS maritime"],
    correct: 1
  },
  {
    question: "Qu'est-ce que le trail running ?",
    options: [
      "Course sur route", 
      "Course en montagne sur sentiers", 
      "Course en salle", 
      "Course de vitesse"
    ],
    correct: 1
  },
  {
    question: "À quelle altitude commence généralement la haute montagne ?",
    options: ["1000m", "2000m", "3000m", "4000m"],
    correct: 2
  },
  {
    question: "Quel est le danger principal en montagne en hiver ?",
    options: ["Les moustiques", "Les avalanches", "La chaleur", "Les serpents"],
    correct: 1
  }
]

function QuizGame({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return // Déjà répondu

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === questions[currentQuestion].correct
    setFeedback(isCorrect)
    
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    // Passer à la question suivante après 1 seconde
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setFeedback(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const score = answers.filter(a => a).length
  const passed = score >= 3

  if (showResult) {
    return (
      <div className="container">
        <div className="game-container quiz-result">
          <h2 className="game-title">Résultats du Quiz 🧠</h2>
          <div className="score-display">
            <div className="score-circle">
              {score} / {questions.length}
            </div>
          </div>
          <p className="result-message">
            {passed ? (
              <>
                <span className="success-icon">✅</span>
                <br />
                Excellent ! Tu connais bien la montagne !
              </>
            ) : (
              <>
                <span className="fail-icon">❌</span>
                <br />
                Pas assez de bonnes réponses... Il faut au moins 3/5.
              </>
            )}
          </p>
          {passed ? (
            <button className="btn-success" onClick={onComplete}>
              Passer au Puzzle 🧩
            </button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={() => {
                setCurrentQuestion(0)
                setAnswers([])
                setShowResult(false)
                setSelectedAnswer(null)
                setFeedback(null)
              }}
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="game-container">
        <h2 className="game-title">Quiz Montagne 🧠</h2>
        <p className="game-subtitle">Réponds correctement à 3 questions sur 5</p>
        
        <div className="quiz-progress">
          Question {currentQuestion + 1} / {questions.length}
        </div>

        <div className="question-card">
          <h3 className="question-text">{questions[currentQuestion].question}</h3>
          
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === index
                    ? feedback
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${selectedAnswer !== null && index === questions[currentQuestion].correct ? 'show-correct' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizGame
