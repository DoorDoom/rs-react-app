const Button = ({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`${className} px-5 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition cursor-pointer `}
    >
      {children}
    </button>
  );
};

export default Button;
