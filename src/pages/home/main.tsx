import type { CardData } from '@shared/types/types';
import { CardsList } from '@components/ui/cards-list';

type MainProps = {
  cards: CardData[];
  isLoading: boolean;
};

const Main = ({ cards, isLoading }: MainProps) => {
  return (
    <main
      className={`results container ${isLoading ? 'skeleton' : 'skeleton'}`}
    >
      <h1>Results</h1>
      {isLoading ? (
        <div className="meter">
          <span>
            <span className="progress"></span>
          </span>
        </div>
      ) : (
        <CardsList cards={cards}></CardsList>
      )}
    </main>
  );
};

export { Main };
