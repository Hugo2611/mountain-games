import { useState } from 'react'
import './QuizGame.css'

const questions = [
  {
    question: "Quelle est la vitesse terminale moyenne d'une avalanche de plaque en chute libre ?",
    options: ["50 km/h", "130 km/h", "200 km/h", "320 km/h"],
    correct: 3,
    explanation: "Une avalanche peut atteindre 320 km/h en quelques secondes, rendant toute fuite impossible."
  },
  {
    question: "À quelle altitude la pression atmosphérique représente environ 50% de celle au niveau de la mer ?",
    options: ["3 500 mètres", "5 500 mètres", "7 000 mètres", "8 848 mètres"],
    correct: 1,
    explanation: "À 5 500 mètres, la pression atmosphérique est divisée par deux, réduisant drastiquement l'oxygène disponible."
  },
  {
    question: "Quel glacier alpin perd en moyenne le plus de masse par an depuis 2000 ?",
    options: ["La Mer de Glace", "Le glacier d'Aletsch", "Le glacier du Rhône", "Le glacier de la Girose"],
    correct: 0,
    explanation: "La Mer de Glace a perdu plus de 120 mètres d'épaisseur depuis 1850, avec une accélération dramatique."
  },
  {
    question: "Combien de temps faut-il généralement pour s'acclimater à 4 000 mètres ?",
    options: ["24 heures", "3-5 jours", "1-2 semaines", "1 mois"],
    correct: 2,
    explanation: "L'acclimatation complète à 4 000 m nécessite 1 à 2 semaines de montée progressive avec paliers."
  },
  {
    question: "Quelle est la concentration minimale d'oxygène dans l'air au-dessus de 8 000 mètres ?",
    options: ["21%", "15%", "10%", "7%"],
    correct: 3,
    explanation: "Au-dessus de 8 000 m (zone de la mort), l'oxygène disponible est inférieur à 7% de celui au niveau de la mer."
  },
  {
    question: "Quel indice de risque d'avalanche sur l'échelle européenne est considéré comme critique ?",
    options: ["Niveau 2", "Niveau 3", "Niveau 4", "Niveau 5"],
    correct: 3,
    explanation: "Le niveau 5 (très fort) signifie des avalanches spontanées de grande ampleur, situation très rare et extrêmement dangereuse."
  },
  {
    question: "Quelle est la capacité pulmonaire perdue en pourcentage à 3 000 mètres d'altitude ?",
    options: ["10%", "25%", "40%", "60%"],
    correct: 2,
    explanation: "À 3 000 m, la capacité pulmonaire effective est réduite d'environ 40% par rapport au niveau de la mer."
  },
  {
    question: "Combien de secondes maximales dispose-t-on pour localiser une victime d'avalanche avant que les chances de survie chutent drastiquement ?",
    options: ["5 minutes", "15 minutes", "30 minutes", "45 minutes"],
    correct: 1,
    explanation: "Après 15 minutes d'ensevelissement, le taux de survie chute de 90% à moins de 30%. La recherche doit être immédiate."
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
