import { useEffect, useState } from 'react';
import api from '../api/axios';
import SweetCard from './SweetCard';

function SweetList({ filters }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSweets = async () => {
    setLoading(true);
    setError('');

    try {
      const hasFilters =
        filters?.name ||
        filters?.category ||
        filters?.minPrice ||
        filters?.maxPrice;

      let response;

      if (hasFilters) {
        response = await api.get('/sweets/search', {
          params: {
            name: filters.name || undefined,
            category: filters.category || undefined,
            minPrice: filters.minPrice || undefined,
            maxPrice: filters.maxPrice || undefined
          }
        });
      } else {
        response = await api.get('/sweets');
      }

      setSweets(response.data);
    } catch (err) {
      setError('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [filters]);

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  if (loading) return <p>Loading sweets...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (sweets.length === 0) {
    return <p>No sweets found</p>;
  }

  return (
    <div style={styles.grid}>
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onPurchase={handlePurchase}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  }
};

export default SweetList;
