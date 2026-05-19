import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router';
import { findPokemon } from '../api/pokemon-api-service';
import Loading from '@/shared/ui/Loading';
import ItemListError from '@/features/item-list/ui/item-list-error';
import type { PokemonCardExtendedData } from '@/shared/types/types';

const PokemonContainer = () => {
  const navigate = useNavigate();
  let { details } = useParams();
  const panelRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<PokemonCardExtendedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    if (details) {
      loadPokemon(details);
    }
  }, [details]);

  const loadPokemon = async (search: string) => {
    setError(null);
    setIsLoading(true);
    console.log('Loading pokemon:', search);

    try {
      const result = await findPokemon(search);

      if (!result) {
        setError('No results found');
      }

      setResult(result);
    } catch {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={panelRef}
      className="w-1/2 mt-6 pb-10 bg-white p-6 rounded-2xl shadow-md border flex flex-col"
    >
      <div className="flex justify-center px-2 pb-3 border-b mb-4 text-2xl">
        <span className="text-gray-600 font-semibold pl-2">Pokemon detail</span>
        <Link
          to="/"
          className="text-white flex items-center px-5 py- text-sm bg-blue-500 rounded-xl hover:bg-blue-600 transition cursor-pointer ml-auto"
        >
          Close
        </Link>
      </div>
      {isLoading && <Loading />}
      {error && <ItemListError message={error} />}
      {!isLoading && !error && result && (
        <div className="grid grid-cols-2">
          <span>Name:</span>
          <p className="font-bold capitalize">{result.name}</p>
          <span>Types:</span>
          <p className="font-bold capitalize">
            {result.types.map((t) => t.type.name).join(', ')}
          </p>
          <span>Height:</span>
          <p className="font-bold capitalize">{result.height}</p>
          <span>Order:</span>
          <p className="font-bold capitalize">{result.order}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonContainer;
