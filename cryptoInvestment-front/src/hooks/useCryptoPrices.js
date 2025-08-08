import { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import socket from '../services/socket';

const useCryptoInfo = (symbol, setInfo) => {
  const [loading, setLoading] = useState(true);

  const fetchInfo = useCallback(async () => {
    if (!symbol) return;

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
  }, [symbol, setInfo]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  useEffect(() => {
    const handleUpdate = (updatedCryptos) => {
      setInfo(updatedCryptos);
    };

    socket.on('UpdatedCryptos', handleUpdate);

    return () => {
      socket.off('UpdatedCryptos', handleUpdate);
    };
  }, [setInfo]);

  return { loading };
};

export default useCryptoInfo;
