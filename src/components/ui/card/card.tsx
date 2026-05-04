type CardProps = {
  name: string;
  description: string;
};

const Card = ({ name, description }: CardProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
    </tr>
  );
};

export { Card };
