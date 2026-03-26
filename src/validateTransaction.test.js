const validateTransaction = require('./validateTransaction');

describe('validateTransaction', () => {
  it('should return false for negative amount', () => {
    expect(validateTransaction(-100, 1000)).toBe(false);
  });

  it('should return false for amount exceeding balance', () => {
    expect(validateTransaction(1500, 1000)).toBe(false);
  });

  it('should return true for valid amount', () => {
    expect(validateTransaction(500, 1000)).toBe(true);
  });
});