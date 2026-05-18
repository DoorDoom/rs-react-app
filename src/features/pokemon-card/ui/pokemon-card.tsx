import { Component, type ReactNode } from 'react';

type Props = {
  name: string;
  type: string;
  imgUrl: string;
};

class PokemonCard extends Component<Props> {
  render(): ReactNode {
    return (
      <article className="p-4 border rounded-md shadow-sm">
        <img
          src={this.props.imgUrl}
          alt={this.props.name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <h2 className="text-lg font-bold">{this.props.name}</h2>
        <p>{this.props.type}</p>
      </article>
    );
  }
}

export default PokemonCard;
