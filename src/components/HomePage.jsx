import './HomePage.css'

function HomePage({ onStart }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">🏔️ Mountain Games</h1>
        <p className="home-subtitle"></p>
        <div className="home-description">
          <p>Bienvenue dans ton aventure montagne !</p>
          <p>Relève 3 défis progressifs pour débloquer une surprise :</p>
          <ul className="challenges-list">
            <li>🧠 Quiz Montagne (Facile)</li>
            <li>🎯 Jeu de Réflexes (Moyen)</li>
            <li>🏃 Runner du Trail (Difficile)</li>
          </ul>
        </div>
        <button className="btn-primary" onClick={onStart}>
          Commencer l'Aventure
        </button>
      </div>
    </div>
  )
}

export default HomePage
