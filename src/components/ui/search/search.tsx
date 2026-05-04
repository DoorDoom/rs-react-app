import { Button } from '../button';

const Search = () => {
  const value = localStorage.getItem('search');

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        className="input"
        value={value || ''}
      />
      <Button>Search</Button>
    </div>
  );
};

export { Search };
