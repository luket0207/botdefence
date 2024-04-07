import React from 'react';
import './Button.scss';

const Button = ({ onClick, type, children, disabled }) => {
  const className = `${type}`;

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
