import { useEffect, useState } from 'react';
import axios from 'axios';

const useCryptoInfo = (symbol) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/crypto/crypto-info?symbol=${symbol}`);
        setInfo(response.data);
      } catch (error) {
        console.error('Error al obtener info:', error);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [symbol]);

  return { info, loading };
};

export default useCryptoInfo;
