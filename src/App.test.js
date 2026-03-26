import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock validateTransaction function
jest.mock('./validateTransaction', () => ({
  __esModule: true,
  default: jest.fn()
}));

import validateTransaction from './validateTransaction';

describe('ICICI Bank Transaction App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login screen initially', () => {
    render(<App />);
    expect(screen.getByText('ICICI Bank')).toBeInTheDocument();
    expect(screen.getByText('Secure Login')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('logs in and shows dashboard', () => {
    render(<App />);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(screen.getByText('ICICI Bank - Welcome John Doe')).toBeInTheDocument();
    expect(screen.getByText('Fund Transfer')).toBeInTheDocument();
    expect(screen.getByText('Your Accounts')).toBeInTheDocument();
  });

  test('navigates to transfer screen', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Fund Transfer'));

    expect(screen.getByText('ICICI Bank - Fund Transfer')).toBeInTheDocument();
    expect(screen.getByLabelText('From Account:')).toBeInTheDocument();
    expect(screen.getByLabelText('Recipient Account Number:')).toBeInTheDocument();
    expect(screen.getByLabelText('Transfer Amount (₹):')).toBeInTheDocument();
  });

  test('validates transaction and shows success', () => {
    validateTransaction.mockReturnValue(true);

    render(<App />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Fund Transfer'));

    // Fill form
    fireEvent.change(screen.getByLabelText('From Account:'), {
      target: { value: 'acc1' }
    });
    fireEvent.change(screen.getByLabelText('Recipient Account Number:'), {
      target: { value: '1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Transfer Amount (₹):'), {
      target: { value: '1000' }
    });

    fireEvent.click(screen.getByText('Transfer Funds'));

    expect(screen.getByText('Transaction Successful')).toBeInTheDocument();
  });

  test('shows error for invalid transaction', () => {
    validateTransaction.mockReturnValue(false);

    render(<App />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Fund Transfer'));

    // Fill form with invalid amount
    fireEvent.change(screen.getByLabelText('From Account:'), {
      target: { value: 'acc1' }
    });
    fireEvent.change(screen.getByLabelText('Recipient Account Number:'), {
      target: { value: '1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Transfer Amount (₹):'), {
      target: { value: '100000' } // Exceeds balance
    });

    fireEvent.click(screen.getByText('Transfer Funds'));

    expect(screen.getByText('Transaction Failed')).toBeInTheDocument();
  });

  test('transfer button is disabled when form is incomplete', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Fund Transfer'));

    const transferButton = screen.getByText('Transfer Funds');
    expect(transferButton).toBeDisabled();

    // Fill partial form
    fireEvent.change(screen.getByLabelText('From Account:'), {
      target: { value: 'acc1' }
    });
    expect(transferButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Recipient Account Number:'), {
      target: { value: '1234567890' }
    });
    expect(transferButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Transfer Amount (₹):'), {
      target: { value: '1000' }
    });
    expect(transferButton).not.toBeDisabled();
  });

  test('can navigate back from transfer screen', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Fund Transfer'));
    fireEvent.click(screen.getByText('Back'));

    expect(screen.getByText('ICICI Bank - Welcome John Doe')).toBeInTheDocument();
  });

  test('shows account balances correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Savings Account')).toBeInTheDocument();
    expect(screen.getByText('Balance: ₹50,000')).toBeInTheDocument();
    expect(screen.getByText('Current Account')).toBeInTheDocument();
    expect(screen.getByText('Balance: ₹25,000')).toBeInTheDocument();
  });
});