import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header className="w-full">
      <div className="w-full py-4 text-center text-xl font-bold bg-white shadow-sm">
        <h1>Find Your Pokemon</h1>
      </div>
      <nav className="w-full py-2 text-center bg-gray-50 shadow-sm">
        <NavLink to="/" className="mx-4 text-gray-700 hover:text-gray-900">
          Home
        </NavLink>
        <NavLink to="/about" className="mx-4 text-gray-700 hover:text-gray-900">
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
