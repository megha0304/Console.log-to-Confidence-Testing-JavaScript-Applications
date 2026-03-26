import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AmountInput from './AmountInput';

test('renders amount input with label', () => {
  render(<AmountInput value="" onChange={() => {}} />);
  const input = screen.getByLabelText(/transfer amount/i);
  expect(input).toBeInTheDocument();
});

test('calls onChange when input value changes', () => {
  const handleChange = jest.fn();
  render(<AmountInput value="" onChange={handleChange} />);
  const input = screen.getByLabelText(/transfer amount/i);
  fireEvent.change(input, { target: { value: '500' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});