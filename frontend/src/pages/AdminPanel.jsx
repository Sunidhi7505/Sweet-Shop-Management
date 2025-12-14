import { useEffect, useState } from 'react';
import api from '../api/axios';
import RevenueChart from '../components/RevenueChart';

function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [revenueData, setRevenueData] = useState([]);
  const [restockQty, setRestockQty] = useState({});

  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch {
      alert('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await api.get('/sweets/revenue');
      setRevenueData(res.data);
    } catch {
      alert('Failed to load revenue data');
    }
  };

  useEffect(() => {
    fetchSweets();
    fetchRevenue();
  }, []);

  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setImage('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/sweets/${editingId}`, {
          name,
          category,
          price: Number(price),
          image
        });
      } else {
        await api.post('/sweets', {
          name,
          category,
          price: Number(price),
          quantity: Number(quantity),
          image
        });
      }

      resetForm();
      fetchSweets();
      fetchRevenue();
    } catch {
      alert('Operation failed');
    }
  };

  const handleEdit = (sweet) => {
    setEditingId(sweet._id);
    setName(sweet.name);
    setCategory(sweet.category);
    setPrice(sweet.price);
    setQuantity(sweet.quantity);
    setImage(sweet.image || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sweet?')) return;

    try {
      await api.delete(`/sweets/${id}`);
      setSweets((prev) => prev.filter((s) => s._id !== id));
      fetchRevenue();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="page">
      <h1>Admin Panel</h1>

      {/* ===== Revenue Chart ===== */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2>Revenue per Sweet</h2>
        {revenueData.length === 0 ? (
          <p>No revenue data available</p>
        ) : (
          <RevenueChart data={revenueData} />
        )}
      </div>

      <div style={styles.layout}>
        {/* ===== LEFT: ADD / UPDATE ===== */}
        <div className="card">
          <h2>{editingId ? 'Update Sweet' : 'Add New Sweet'}</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {!editingId && (
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            )}

            <input
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {/* Image Preview */}
            {image && (
              <img
                src={image}
                alt="preview"
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}
              />
            )}

            <button type="submit">
              {editingId ? 'Update Sweet' : 'Add Sweet'}
            </button>

            {editingId && (
              <button
                type="button"
                style={{ marginLeft: '10px' }}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* ===== RIGHT: LIST ===== */}
        <div className="card">
          <h2>Existing Sweets</h2>

          {loading && <p>Loading...</p>}
          {!loading && sweets.length === 0 && <p>No sweets available</p>}

          {!loading &&
            sweets.map((sweet) => (
              <div key={sweet._id} className="admin-item">
                <div>
                  <strong>{sweet.name}</strong>
                  <p className="muted">
                    {sweet.category} • ₹{sweet.price}
                  </p>
                  <p>Stock: {sweet.quantity}</p>
                </div>

                <div className="admin-actions">
                  <input
                    type="number"
                    placeholder="+Qty"
                    min="1"
                    value={restockQty[sweet._id] || ''}
                    onChange={(e) =>
                      setRestockQty({
                        ...restockQty,
                        [sweet._id]: e.target.value
                      })
                    }
                  />

                  <button
                    className="success"
                    onClick={async () => {
                      try {
                        await api.post(`/sweets/${sweet._id}/restock`, {
                          quantity: Number(restockQty[sweet._id])
                        });
                        setRestockQty((prev) => ({
                          ...prev,
                          [sweet._id]: ''
                        }));
                        fetchSweets();
                        fetchRevenue();
                      } catch {
                        alert('Restock failed');
                      }
                    }}
                  >
                    Restock
                  </button>

                  <button onClick={() => handleEdit(sweet)}>Edit</button>

                  <button
                    className="danger"
                    onClick={() => handleDelete(sweet._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
    marginTop: '24px'
  }
};

export default AdminPanel;
