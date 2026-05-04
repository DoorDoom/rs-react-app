import { Search } from '../search';

type HeaderProps = {
  fetchData: (search: string) => Promise<void>;
};

const Header = ({ fetchData }: HeaderProps) => {
  return (
    <header className="top-controls container">
      <h1>Top controls</h1>
      <p>
        Presents name and description of the pokemons. Use API:
        https://pokeapi.co/api/v2/pokemon
      </p>
      <Search fetchData={fetchData}></Search>
    </header>
  );
};

export { Header };
