import './ProgressBar.css'

function ProgressBar({ progress }) {
  const steps = [
    { name: 'Quiz', completed: progress.quiz, icon: '🧠' },
    { name: 'Réflexes', completed: progress.puzzle, icon: '🎯' },
    { name: 'Simon', completed: progress.runner, icon: '🎵' }
  ]

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div key={index} className="progress-step">
            <div className={`step-circle ${step.completed ? 'completed' : ''}`}>
              {step.completed ? '✓' : step.icon}
            </div>
            <div className="step-label">{step.name}</div>
            {index < steps.length - 1 && (
              <div className={`step-line ${step.completed ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
