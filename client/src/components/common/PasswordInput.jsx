import React, { useState } from 'react';

export default function PasswordInput({ label, labelStyle, inputStyle, ...inputProps }) {
  const [isVisible, setIsVisible] = useState(false);
  const action = isVisible ? 'Ẩn' : 'Hiện';

  return (
    <>
      <label htmlFor={inputProps.id} style={labelStyle}>{label}</label>
      <div style={styles.field}>
        <input
          {...inputProps}
          type={isVisible ? 'text' : 'password'}
          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
        />
        <button
          type="button"
          aria-label={`${action} ${label.toLowerCase()}`}
          aria-controls={inputProps.id}
          onClick={() => setIsVisible((visible) => !visible)}
          style={styles.button}
        >
          {action}
        </button>
      </div>
    </>
  );
}

const styles = {
  field: { display: 'flex', gap: '8px' },
  button: {
    minWidth: '54px',
    padding: '0 10px',
    border: '1px solid #fed7aa',
    borderRadius: '6px',
    backgroundColor: '#fff7ed',
    color: '#9a3412',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};
