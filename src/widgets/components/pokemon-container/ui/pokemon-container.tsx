import Loading from '@shared/ui/Loading';
import {
  Component,
  createContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { SearchContainer } from '@/features/search-container';
import type { State } from '../model/interfaces';
import ItemList from '@/features/item-list/ui/item-list';
import { fetchPokemons } from '../model/pokemon-service';
import useLocalStorage from '@/shared/hooks/UseLocalStorage';
import Button from '@/shared/ui/Button';
import { useParams, useSearchParams } from 'react-router';
import type { PokemonCardData } from '@/shared/types/types';
import PokemonCard from './pokemon-card';

const SEARCH_KEY = 'searchTerm';
const PAGE_KEY = 'page';

const PokemonContainerContext = createContext<string>('');

// class PokemonContainer extends Component {
//   state: State = {
//     results: [],
//     loading: false,
//     error: null,
//     search: '',
//     page: 1,
//   };

//   componentDidMount() {
//     const savedSearch = localStorage.getItem(SEARCH_KEY);
//     const savedPage = Number(localStorage.getItem(PAGE_KEY));

//     if (savedSearch) {
//       this.setState(
//         {
//           search: savedSearch,
//           page: savedPage,
//         },
//         this.loadPokemons
//       );
//     } else {
//       this.loadPokemons('', 1);
//     }
//   }

//   loadPokemons = async (search = this.state.search, page = this.state.page) => {
//     this.setState({ loading: true, error: null });

//     try {
//       const { results } = await fetchPokemons(search, page);

//       this.setState({
//         results,
//       });
//     } catch {
//       this.setState({ error: 'Failed to load data' });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   handleSearch = (value: string) => {
//     const trimmed = value.trim();

//     if (trimmed === this.state.search) return;

//     localStorage.setItem(SEARCH_KEY, trimmed);
//     localStorage.setItem(PAGE_KEY, '1');

//     this.setState(
//       {
//         search: trimmed,
//         page: 1,
//         error: null,
//       },
//       () => this.loadPokemons(trimmed, 1)
//     );
//   };

//   nextPage = () => {
//     const newPage = this.state.page + 1;

//     localStorage.setItem(PAGE_KEY, newPage.toString());

//     this.setState({ page: newPage }, () =>
//       this.loadPokemons(this.state.search, newPage)
//     );
//   };

//   prevPage = () => {
//     const newPage = Math.max(this.state.page - 1, 1);

//     localStorage.setItem(PAGE_KEY, newPage.toString());

//     this.setState({ page: newPage }, () =>
//       this.loadPokemons(this.state.search, newPage)
//     );
//   };

//   render() {
//     const { results, loading, error, search, page } = this.state;

//     return (
//       <PokemonContainerContext value={theme}>
//         <div className="w-full max-w-4xl min-h-[75vh] py-4 text-center text-sm text-gray-500">
//           {this.state.loading ? (
//             <Loading />
//           ) : (
//             <>
//               <SearchContainer
//                 onSearch={this.handleSearch}
//                 initialValue={search}
//               />
//               <ItemList
//                 results={results}
//                 loading={loading}
//                 error={error}
//                 onNext={this.nextPage}
//                 onPrev={this.prevPage}
//                 page={this.state.page}
//               />
//             </>
//           )}
//         </div>
//       </PokemonContainerContext>
//     );
//   }
// }

const PokemonContainer = () => {
  const [search, setSearch] = useLocalStorage('searchTerm', '');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<PokemonCardData[]>([]);

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

  // const handleSearch = (value: string) => {
  //   const trimmed = value.trim();

  //   if (trimmed === search) return;

  //   localStorage.setItem(SEARCH_KEY, trimmed);
  //   localStorage.setItem(PAGE_KEY, '1');

  //   this.setState(
  //     {
  //       search: trimmed,
  //       page: 1,
  //       error: null,
  //     },
  //     () => this.loadPokemons(trimmed, 1)
  //   );
  // };

  const page = searchParams.get('page');

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: '1' });
    }
    loadPokemons(search, Number(page) || 1);
  }, [page, search]);

  if (hasError) {
    throw new Error('Simulated render error');
  }

  // const updateQuantityAction = () => {
  //   setClientQuantity(newQuantity);

  //   // Access the pending state of the transition,
  //   // by wrapping in startTransition again.
  //   startTransition(async () => {
  //     const savedQuantity = await updateQuantity(newQuantity);
  //     startTransition(() => {
  //       setQuantity(savedQuantity);
  //     });
  //   });
  // };

  return (
    <>
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
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                type={pokemon.types.map((t) => t.type.name).join(', ')}
                imgUrl={pokemon.sprites.front_default}
              />
            ))}
          </ItemList>
        </div>
      </PokemonContainerContext>
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
