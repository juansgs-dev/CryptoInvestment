import { useEffect, useState } from 'react';
import axios from 'axios';

const useCryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/crypto/cryptos');
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return { cryptos, loading };
};

export default useCryptoList;
