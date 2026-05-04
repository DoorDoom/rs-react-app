import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, type, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${className} button`} type={type}>
      {children}
    </button>
  );
};

export { Button };
