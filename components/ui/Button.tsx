// components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; // Added to handle loading state
}

const Button = ({
  className = '',
  text,
  href,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const sharedClasses = `
    flex items-center justify-center
    text-white text-center font-medium text-sm
    rounded-md shadow-sm
    transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    bg-black-pearl-600 hover:bg-black-pearl-700
    px-4 py-2
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  if (onClick || type !== 'button') {
    return (
      <button
        onClick={onClick}
        className={sharedClasses}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }

  return (
    <a href={href || '#'} className={sharedClasses}>
      {text}
    </a>
  );
};

export default Button;