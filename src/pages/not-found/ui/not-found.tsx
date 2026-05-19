import { NavLink } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4 bg-white rounded-2xl shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl mb-4">
        The page you are looking for does not exist.
      </p>
      <NavLink to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </NavLink>
    </div>
  );
};

export { NotFoundPage };
