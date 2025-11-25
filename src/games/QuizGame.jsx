import { useState } from 'react'
import './QuizGame.css'

const questions = [
  {
    question: "Quelle est la plus haute montagne d'Europe occidentale ?",
    options: ["Le Mont Blanc (4 809 m)", "Le Cervin (4 478 m)", "L'Eiger (3 970 m)", "La Jungfrau (4 158 m)"],
    correct: 0,
    explanation: "Le Mont Blanc culmine à 4 809 mètres et se situe dans les Alpes, à la frontière franco-italienne."
  },
  {
    question: "Quel équipement est indispensable pour le ski de randonnée ?",
    options: ["Des lunettes de soleil", "Des peaux de phoque", "Un parapluie", "Une boussole maritime"],
    correct: 1,
    explanation: "Les peaux de phoque se fixent sous les skis pour permettre de monter sans glisser en arrière."
  },
  {
    question: "Qu'est-ce que le trail running ?",
    options: [
      "Course sur route bitumée", 
      "Course en montagne sur sentiers naturels", 
      "Course en salle sur tapis", 
      "Sprint de 100 mètres"
    ],
    correct: 1,
    explanation: "Le trail running est une course à pied en pleine nature, sur des chemins de montagne variés."
  },
  {
    question: "À quelle altitude commence généralement la haute montagne dans les Alpes ?",
    options: ["1 500 mètres", "2 000 mètres", "3 000 mètres", "4 000 mètres"],
    correct: 2,
    explanation: "La haute montagne commence traditionnellement à 3 000 mètres, où la neige est présente toute l'année."
  },
  {
    question: "Quel est le danger naturel le plus mortel en montagne l'hiver ?",
    options: ["Les orages", "Les avalanches", "Le brouillard", "Le verglas"],
    correct: 1,
    explanation: "Les avalanches causent de nombreux accidents mortels chaque hiver en montagne."
  },
  {
    question: "Quelle est la bonne vitesse de progression en altitude pour éviter le mal des montagnes ?",
    options: ["1 000 m par jour", "500 m par jour au-dessus de 3 000 m", "2 000 m par jour", "Pas de limite"],
    correct: 1,
    explanation: "Au-dessus de 3 000 m, il est recommandé de ne pas monter plus de 300-500 m de dénivelé par jour."
  },
  {
    question: "Quel signal d'alarme indique un besoin d'aide en montagne ?",
    options: ["6 signaux par minute", "3 signaux longs", "1 signal continu", "10 signaux rapides"],
    correct: 0,
    explanation: "Le signal de détresse international : 6 signaux (visuels ou sonores) par minute, pause 1 min, puis répéter."
  },
  {
    question: "Quelle est la température moyenne qui baisse tous les 100 mètres d'altitude ?",
    options: ["0,2°C", "0,6°C", "1°C", "1,5°C"],
    correct: 1,
    explanation: "En moyenne, la température baisse de 0,6°C tous les 100 mètres d'élévation."
  }
]

function QuizGame({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return // Déjà répondu

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === questions[currentQuestion].correct
    setFeedback(isCorrect)
    setShowExplanation(true)
    
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    // Passer à la question suivante après 3 secondes pour lire l'explication
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setFeedback(null)
        setShowExplanation(false)
      } else {
        setShowResult(true)
      }
    }, 3500)
  }

  const score = answers.filter(a => a).length
  const passed = score >= 5 // Besoin de 5/8 maintenant

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
                Excellent ! Tu es un véritable expert de la montagne !
              </>
            ) : (
              <>
                <span className="fail-icon">❌</span>
                <br />
                Pas assez de bonnes réponses... Il faut au moins 5/8 pour réussir.
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
        <p className="game-subtitle">Réponds correctement à 5 questions sur 8</p>
        
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
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`explanation ${feedback ? 'correct-exp' : 'incorrect-exp'}`}>
              <strong>{feedback ? '✅ Correct !' : '❌ Incorrect'}</strong>
              <p>{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizGame
