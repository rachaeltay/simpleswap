import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

describe('Form', () => {
  const coins = {
    btc: { value: 1 },
    eth: { value: 2 },
  };

  test('renders form elements correctly', () => {
    render(<Form coins={coins} />);

    // Ensure the form elements are rendered
    expect(screen.getByLabelText('You sell')).toBeInTheDocument();
    expect(screen.getByLabelText('You get approximately')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Exchange' })
    ).toBeInTheDocument();
  });

  test('form submission updates state', () => {
    render(<Form coins={coins} />);

    // Simulate user input and form submission
    fireEvent.change(screen.getByLabelText('You sell'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('You get approximately'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Exchange' }));

    // Ensure the form state is updated after submission
    expect(screen.getByLabelText('You sell')).toHaveValue('0');
    expect(screen.getByLabelText('You get approximately')).toHaveValue('0');
  });
});
