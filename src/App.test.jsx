import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn app', () => {
  render(<App />);
  const textElement = screen.getByText(/Simpleswap/i);
  expect(textElement).toBeInTheDocument();
});
