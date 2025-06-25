import { useState, useEffect, useRef } from 'react';

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

// Simple cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useCoinGecko = (endpoint, params = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Cancel previous request if still pending
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                // Create new abort controller
                abortControllerRef.current = new AbortController();

                const apiUrl = new URL(
                    `https://api.coingecko.com/api/v3/${endpoint}`
                );
                Object.entries(params || {}).forEach(([key, value]) =>
                    apiUrl.searchParams.append(key, value)
                );

                // Check cache first (but skip cache on manual refresh)
                const cacheKey = apiUrl.toString();
                const cachedData = cache.get(cacheKey);

                if (
                    cachedData &&
                    Date.now() - cachedData.timestamp < CACHE_DURATION &&
                    refreshTrigger === 0
                ) {
                    setData(cachedData.data);
                    setLoading(false);
                    return;
                }

                // Try the real API first
                try {
                    const response = await fetch(apiUrl.toString(), {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        signal: abortControllerRef.current.signal,
                    });

                    if (response.ok) {
                        const responseData = await response.json();

                        // Cache the successful response
                        cache.set(cacheKey, {
                            data: responseData,
                            timestamp: Date.now(),
                        });

                        setData(responseData);
                        return;
                    } else {
                        throw new Error(
                            `HTTP ${response.status}: ${response.statusText}`
                        );
                    }
                } catch (apiError) {
                    if (apiError.name === 'AbortError') {
                        return; // Request was cancelled
                    }
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
                if (err.name !== 'AbortError') {
                    setError(err);
                    console.error('API Error:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to abort pending requests
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [endpoint, params, refreshTrigger]);

    // Simple refresh function
    const refresh = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return [data, error, loading, refresh];
};

export default useCoinGecko;
