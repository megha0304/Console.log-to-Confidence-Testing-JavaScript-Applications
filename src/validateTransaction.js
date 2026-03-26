function validateTransaction(amount, balance) {
  if (amount <= 0) return false;
  if (amount > balance) return false;
  return true;
}

module.exports = validateTransaction;