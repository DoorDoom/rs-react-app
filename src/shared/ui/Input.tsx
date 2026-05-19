import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
      ref={ref}
    />
  );
});

export default Input;
