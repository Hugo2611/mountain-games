import './GiftCard.css'

function GiftCard({ onReset }) {
  return (
    <div className="gift-container">
      <div className="gift-content">
        <div className="confetti">🎉</div>
        <h1 className="gift-title">Bravo Tom !</h1>
        <p className="gift-message">
          Tu as réussi tous les défis de la montagne !
        </p>
        
        <div className="gift-card-display">
          <div className="card-inner">
            <h2>🎁 CARTE CADEAU 🎁</h2>
            <div className="card-amount">50€</div>
            <p className="card-description">Valable dans tous nos magasins</p>
            <div className="card-code">Code: MOUNTAIN2025</div>
            <div className="mountain-icon">🏔️⛷️🏃</div>
          </div>
        </div>

        <div className="gift-actions">
          <button className="btn-success" onClick={() => window.print()}>
            📥 Télécharger / Imprimer
          </button>
          <button className="btn-secondary" onClick={onReset}>
            🔄 Recommencer
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
