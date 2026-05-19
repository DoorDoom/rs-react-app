import { type ReactNode } from 'react';
import ItemListPagination from './item-list-pagination';
import Loading from '@shared/ui/Loading';
import ItemListError from './item-list-error';

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
