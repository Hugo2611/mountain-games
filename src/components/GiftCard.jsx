import './GiftCard.css'

function GiftCard({ onReset }) {
  return (
    <div className="gift-container">
      <div className="gift-content">
        <div className="confetti">🎉</div>
        <h1 className="gift-title">Félicitations Tom !</h1>
        <p className="gift-message">
          Tu as réussi tous les défis difficiles de la montagne !
        </p>
        
        <div className="gift-card-display">
          <img 
            src="/gift-card.jpg" 
            alt="Carte Cadeau Montagne 50€" 
            className="gift-card-image"
          />
        </div>

        <div className="personal-message">
          <h2>🎁 Ta récompense : 50€ 🎁</h2>
          <p className="message-text">
            Je te donnerai l'argent personnellement !<br/>
            Bravo pour avoir relevé ces défis experts ! 🏔️
          </p>
        </div>

        <div className="gift-actions">
          <button className="btn-success" onClick={() => window.print()}>
            📥 Imprimer cette page
          </button>
          <button className="btn-secondary" onClick={onReset}>
            🔄 Recommencer le défi
          </button>
        </div>

        <p className="gift-footer">
          Merci d'avoir participé à l'aventure Mountain Games ! 🏔️
        </p>
      </div>
    </div>
  )
}

export default GiftCard
