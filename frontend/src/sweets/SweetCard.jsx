function SweetCard({ sweet, onPurchase }) {
  const outOfStock = sweet.quantity === 0;
  const lastOne = sweet.quantity === 1;

  return (
    <div className="card sweet-card">
      {sweet.image && (
        <img
          src={sweet.image}
          alt={sweet.name}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '10px',
            display: 'block'
          }}
        />
      )}

      <h3>{sweet.name}</h3>

      <p className="muted">{sweet.category}</p>

      <div className="price-row">
        <span className="price">₹{sweet.price}</span>

        {outOfStock && (
          <span className="stock stock-out">Out of stock</span>
        )}

        {!outOfStock && lastOne && (
          <span className="stock stock-warning">
            Hurry up, only 1 left
          </span>
        )}

        {!outOfStock && !lastOne && (
          <span className="stock stock-in">
            {sweet.quantity} left
          </span>
        )}
      </div>

      <button
        disabled={outOfStock}
        onClick={() => onPurchase(sweet._id)}
      >
        {outOfStock ? 'Unavailable' : 'Purchase'}
      </button>
    </div>
  );
}

export default SweetCard;
