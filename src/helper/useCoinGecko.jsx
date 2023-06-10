import { useState, useEffect } from 'react';

const useCoinGecko = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = new URL(`https://api.coingecko.com/api/v3/${endpoint}`);
    Object.entries(params || {}).forEach(([key, value]) => apiUrl.searchParams.append(key, value));

    const fetchData = () => {
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        });
    };

    const timeoutId = setTimeout(fetchData, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [endpoint, params]);

  return [data, error];
};

export default useCoinGecko;
