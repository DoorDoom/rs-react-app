import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

const Button = ({ children, className }: ButtonProps) => {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export { Button };
