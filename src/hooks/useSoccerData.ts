import { useEffect, useState } from 'react';
import axios from 'axios';

type Data = any; // Substitua pelo tipo correto para os dados retornados pela API.

const useSoccerData = (endpoint: string) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = `football_data_${endpoint}`;
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em milissegundos.
  const ApiKey = import.meta.env.VITE_API_KEY || '';

  const fetchData = async () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedData = JSON.parse(cached);
        const isExpired = Date.now() - cachedData.timestamp > CACHE_DURATION;

        if (!isExpired) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }

      const response = await axios.get(
        `https://api.api-futebol.com.br/v1/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${ApiKey}`, // Substitua pela sua chave da API
          },
        }
      );

      const result = response.data;
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: result, timestamp: Date.now() })
      );
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente.
  }, [endpoint]);

  return { data, loading };
};

export default useSoccerData;
