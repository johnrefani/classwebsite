import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  className = '',
  text,
  href = '#',
  onClick,
  type = 'button',
}: ButtonProps) => {
  const sharedClasses = `
    mt-6 
    flex items-center justify-center
    text-white text-center font-medium
    rounded-md transition-all duration-200 active:scale-95
    w-[150px] h-[45px]
    sm:w-[180px] sm:h-[50px]
    md:w-[200px] md:h-[55px]
    ${className}
  `;

  if (onClick) {
    return (
      <button onClick={onClick} className={sharedClasses} type={type}>
        {text}
      </button>
    );
  }

  return (
    <a href={href} className={sharedClasses}>
      {text}
    </a>
  );
};

export default Button;
