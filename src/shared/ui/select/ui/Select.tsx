import './style.css';

const Select = ({
  children,
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="checkbox">
      <label className="checkbox-wrapper">
        <input {...props} type="checkbox" className="checkbox-input" />
        <div className="checkbox-tile">{children}</div>
      </label>
    </div>
  );
};

// <div className={`${className} custom-checkbox`}>
//   <span className="checkmark"></span>
//   <input
//     {...props}
//     type="checkbox"
//     className={` w-5 h-5 rounded text-blue-600 border-gray-300 focus:ring-blue-500 `}
//   />
// </div>
export default Select;
