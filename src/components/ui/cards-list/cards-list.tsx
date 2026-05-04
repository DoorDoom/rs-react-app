import { Card } from '../card';
import type { CardData } from '../../../types/types';

type CardsListProps = {
  cards: CardData[];
};

const CardsList = ({ cards }: CardsListProps) => {
  return (
    <table className="card-list">
      <thead>
        <tr className="card-list__columns">
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((item, ind) => (
          <Card
            key={ind}
            name={item.name}
            description={item.description}
          ></Card>
        ))}
      </tbody>
    </table>
  );
};

export { CardsList };
