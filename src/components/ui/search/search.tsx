import type { FormEvent, ChangeEvent } from 'react';
import { Button } from '../button';

type SearchProps = {
  fetchData: (search: string) => Promise<void>;
};

const Search = ({ fetchData }: SearchProps) => {
  let value = localStorage.getItem('search');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('search', value ?? '');
    fetchData(value ?? '');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    value = e.target.value;
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        placeholder="Search..."
        className="input"
        defaultValue={value || ''}
        onChange={(e) => handleChange(e)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export { Search };
