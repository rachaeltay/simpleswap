import { renderHook } from '@testing-library/react';
import useCoinGecko from '../helper/useCoinGecko';

describe('useCoinGecko', () => {
  it('fetches data successfully and has a key called "rates"', async () => {
    const { result, waitFor } = renderHook(() => useCoinGecko('exchange_rates'));

    // wait for the hook to finish fetching data
    await waitFor(() => result.current[0] !== null);

    expect(result.current[0]).toHaveProperty('rates');
  });
});
