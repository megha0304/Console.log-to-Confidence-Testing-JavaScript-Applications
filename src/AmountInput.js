import React from 'react';

function AmountInput({ value, onChange }) {
  return (
    <label>
      Transfer Amount:
      <input
        type="number"
        value={value}
        onChange={onChange}
        min="0"
      />
    </label>
  );
}

export default AmountInput;