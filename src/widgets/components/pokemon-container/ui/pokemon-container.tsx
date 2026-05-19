import { createContext, useEffect, useState } from 'react';
import { SearchContainer } from '@/features/search-container';
import ItemList from '@/features/item-list/ui/item-list';
import { fetchPokemons } from '../model/pokemon-service';
import useLocalStorage from '@/shared/hooks/UseLocalStorage';
import Button from '@/shared/ui/Button';
import { Link, Outlet, useSearchParams } from 'react-router';
import type { PokemonCardData } from '@/shared/types/types';
import PokemonCard from './pokemon-card';

const PokemonContainerContext = createContext<string>('');

const PokemonContainer = () => {
  const [search, setSearch] = useLocalStorage('searchTerm', '');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<PokemonCardData[]>([]);

  const page = searchParams.get('page');

  const loadPokemons = async (search: string, page: number) => {
    setError(null);
    setIsLoading(true);

    try {
      const { results } = await fetchPokemons(search, page);

      if (results.length === 0) {
        setError('No results found');
      }

      setResults(results);
    } catch {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: '1' });
    }
    loadPokemons(search, Number(page) || 1);
  }, [page, search]);

  if (hasError) {
    throw new Error('Simulated render error');
  }

  return (
    <>
      <div className="flex gap-8">
        <PokemonContainerContext value={search}>
          <div className="w-full max-w-4xl min-h-[75vh] py-4 text-center text-sm text-gray-500">
            <SearchContainer onSearch={setSearch} initialValue={search} />
            <ItemList
              onNext={() => {
                setSearchParams({ page: `${Number(page) + 1}` });
              }}
              onPrev={() => {
                setSearchParams({ page: `${Math.max(Number(page) - 1, 1)}` });
              }}
              page={Number(page)}
              loading={isLoading}
              error={error}
            >
              {results.map((pokemon: PokemonCardData) => (
                <Link to={pokemon.name} key={pokemon.name}>
                  <PokemonCard
                    name={pokemon.name}
                    type={pokemon.types.map((t) => t.type.name).join(', ')}
                    imgUrl={pokemon.sprites.front_default}
                  />
                </Link>
              ))}
            </ItemList>
          </div>
        </PokemonContainerContext>
        <Outlet />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => setHasError(true)}
          className="text-white bg-red-500  hover:bg-red-600"
        >
          Simulate Error
        </Button>
      </div>
    </>
  );
};

export default PokemonContainer;
