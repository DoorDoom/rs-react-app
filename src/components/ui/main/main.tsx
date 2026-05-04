import type { CardData } from '../../../types/types';
import { CardsList } from '../cards-list';

type MainProps = {
  cards: CardData[];
};

const Main = ({ cards }: MainProps) => {
  return (
    <main className="results container">
      <h1>Results</h1>
      <CardsList cards={cards}></CardsList>
    </main>
  );
};

export { Main };
