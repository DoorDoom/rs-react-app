import { Component, type ReactNode } from 'react';
import ItemListPagination from './item-list-pagination';
import Loading from '@shared/ui/Loading';
import Button from '@shared/ui/Button';
import ItemListError from './item-list-error';
import type { PokemonCardData } from '@shared/types/types';

// interface Props {
//   results: PokemonCardData[];
//   loading: boolean;
//   error: string | null;
//   onNext: () => void;
//   onPrev: () => void;
//   page: number;
// }

// class ItemList extends Component<Props> {
//   state = {
//     forceError: false,
//   };

//   render() {
//     if (this.state.forceError) {
//       throw new Error('Simulated render error');
//     }

//     const { results, loading, error, onNext, onPrev, page } = this.props;

//     return (
//       <section className="w-full mt-6 pb-10 bg-white p-6 rounded-2xl shadow-md border flex flex-col">
//         <div className='className="flex-1'>
//           <div className="flex justify-center px-2 pb-3 border-b mb-4 text-2xl">
//             <span className="text-gray-600 font-semibold pl-2">Pokemons</span>
//           </div>

//           {loading && <Loading />}

//           {error && <ItemListError message={error} />}

//           {!loading && !error && results.length === 0 && (
//             <p className="text-center text-gray-500">No results found</p>
//           )}

//           {!loading && !error && results.length > 0 && (
//             <>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {this.props.results.map((pokemon) => (
//                   <PokemonCard
//                     key={pokemon.name}
//                     name={pokemon.name}
//                     type={pokemon.types.map((t) => t.type.name).join(', ')}
//                     imgUrl={pokemon.sprites.front_default}
//                   />
//                 ))}
//               </div>
//               <ItemListPagination page={page} onNext={onNext} onPrev={onPrev} />
//             </>
//           )}
//         </div>

//         <div className="flex justify-center mt-4">
//           <Button
//             onClick={() => this.setState({ forceError: true })}
//             className="text-white bg-red-500  hover:bg-red-600"
//           >
//             Simulate Error
//           </Button>
//         </div>
//       </section>
//     );
//   }
// }

interface Props {
  children?: ReactNode;
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrev: () => void;
  page: number;
}

const ItemList = ({
  children,
  loading,
  error,
  onNext,
  onPrev,
  page,
}: Props) => {
  return (
    <section className="w-full mt-6 pb-10 bg-white p-6 rounded-2xl shadow-md border flex flex-col">
      <div className="flex justify-center px-2 pb-3 border-b mb-4 text-2xl">
        <span className="text-gray-600 font-semibold pl-2">Pokemons</span>
      </div>
      {loading && <Loading />}
      {error && <ItemListError message={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4">{children}</div>
      )}
      <ItemListPagination page={page} onNext={onNext} onPrev={onPrev} />
    </section>
  );
};

export default ItemList;
