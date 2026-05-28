type Props = {
  name: string;
  type: string;
  imgUrl: string;
};

const PokemonCard = ({ name, type, imgUrl }: Props) => {
  return (
    <div className="relative">
      <article className="p-4 border rounded-md shadow-sm">
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <h2 className="text-lg font-bold">{name}</h2>
        <p>{type}</p>
      </article>
    </div>
  );
};

export default PokemonCard;
