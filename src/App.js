import React, { useState } from 'react';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);

  // Mock user data
  const mockUser = {
    id: '12345',
    name: 'John Doe',
    accounts: [
      { id: 'acc1', type: 'Savings', balance: 50000 },
      { id: 'acc2', type: 'Current', balance: 25000 }
    ]
  };

  const handleLogin = () => {
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    const account = user.accounts.find(acc => acc.id === selectedAccount);
    
    if (validateTransaction(amount, account.balance)) {
      // For demo purposes, process immediately
      setTransactionStatus('success');
      setCurrentView('result');
    } else {
      setTransactionStatus('failed');
      setCurrentView('result');
    }
  };

  const validateTransaction = (amount, balance) => {
    return amount > 0 && amount <= balance;
  };

  const resetTransaction = () => {
    setCurrentView('dashboard');
    setSelectedAccount(null);
    setTransferAmount('');
    setRecipientAccount('');
    setTransactionStatus(null);
  };

  if (currentView === 'login') {
    return (
      <div className="app">
        <div className="login-container">
          <h1>ICICI Bank</h1>
          <h2>Secure Login</h2>
          <button onClick={handleLogin} className="login-btn">Login</button>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className="app">
        <header>
          <h1>ICICI Bank - Welcome {user.name}</h1>
          <button onClick={() => setCurrentView('transfer')} className="transfer-btn">
            Fund Transfer
          </button>
        </header>
        <div className="accounts">
          <h2>Your Accounts</h2>
          {user.accounts.map(account => (
            <div key={account.id} className="account-card">
              <h3>{account.type} Account</h3>
              <p>Balance: ₹{account.balance.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'transfer') {
    return (
      <div className="app">
        <header>
          <h1>ICICI Bank - Fund Transfer</h1>
          <button onClick={() => setCurrentView('dashboard')} className="back-btn">Back</button>
        </header>
        
        <div className="transfer-form">
          <div className="form-group">
            <label htmlFor="fromAccount">From Account:</label>
            <select 
              id="fromAccount" 
              value={selectedAccount || ''} 
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">Select Account</option>
              {user.accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.type} - ₹{account.balance.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="recipientAccount">Recipient Account Number:</label>
            <input
              type="text"
              id="recipientAccount"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              placeholder="Enter account number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Transfer Amount (₹):</label>
            <input
              type="number"
              id="amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              min="0"
              placeholder="Enter amount"
            />
          </div>

          <button 
            onClick={handleTransfer} 
            className="transfer-btn"
            disabled={!selectedAccount || !transferAmount || !recipientAccount}
          >
            Transfer Funds
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'result') {
    return (
      <div className="app">
        <div className="result-container">
          <h1>Transaction {transactionStatus === 'success' ? 'Successful' : 'Failed'}</h1>
          {transactionStatus === 'success' ? (
            <div className="success-message">
              <p>₹{transferAmount} has been transferred successfully!</p>
              <p>Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          ) : (
            <div className="error-message">
              <p>Transaction failed. Please check your balance and try again.</p>
            </div>
          )}
          <button onClick={resetTransaction} className="back-btn">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;