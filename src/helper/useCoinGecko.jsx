import { useState, useEffect } from 'react';

// Mock data for development to avoid CORS issues
const mockData = {
    rates: {
        btc: { name: 'Bitcoin', unit: 'BTC', value: 1, type: 'crypto' },
        eth: { name: 'Ethereum', unit: 'ETH', value: 0.062, type: 'crypto' },
        usd: { name: 'US Dollar', unit: '$', value: 43250, type: 'fiat' },
        eur: { name: 'Euro', unit: '€', value: 39500, type: 'fiat' },
        gbp: { name: 'British Pound', unit: '£', value: 34000, type: 'fiat' },
        ada: { name: 'Cardano', unit: 'ADA', value: 0.000023, type: 'crypto' },
        dot: { name: 'Polkadot', unit: 'DOT', value: 0.00045, type: 'crypto' },
        sol: { name: 'Solana', unit: 'SOL', value: 0.0012, type: 'crypto' },
        matic: {
            name: 'Polygon',
            unit: 'MATIC',
            value: 0.00089,
            type: 'crypto',
        },
        link: {
            name: 'Chainlink',
            unit: 'LINK',
            value: 0.00067,
            type: 'crypto',
        },
    },
};

const useCoinGecko = (endpoint, params = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = new URL(`https://api.coingecko.com/api/v3/${endpoint}`);
        Object.entries(params || {}).forEach(([key, value]) =>
            apiUrl.searchParams.append(key, value)
        );

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Try the real API first
                try {
                    const response = await fetch(apiUrl.toString(), {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        setData(responseData);
                        return;
                    }
                } catch (apiError) {
                    console.warn(
                        'API call failed, using mock data:',
                        apiError.message
                    );
                }

                // Fallback to mock data for development
                setTimeout(() => {
                    setData(mockData);
                }, 1000); // Simulate loading time
            } catch (err) {
                setError(err);
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, params]);

    return [data, error, loading];
};

export default useCoinGecko;
