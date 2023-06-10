import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

describe('Form', () => {
  const coins = {
    btc: { value: 50000 },
    eth: { value: 3000 },
  };

  test('renders form and performs exchange on submit', () => {
    render(<Form coins={coins} />);

    // Assert initial state
    expect(screen.getByLabelText('You sell')).toBeInTheDocument();
    expect(screen.getByLabelText('You get approximately')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Exchange' })).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText('You sell'), { target: { value: 1 } });

    // Assert updated state
    expect(screen.getByLabelText('You sell')).toHaveValue(1);
    expect(screen.getByLabelText('You get approximately')).toHaveValue(0.06000);

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: 'Exchange' }));

    // Assert that the exchange function is called
    // expect(mockExchangeFunction).toHaveBeenCalled();
  });
});
