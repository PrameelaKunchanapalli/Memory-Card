import './card.css';
import type { PokemonCard } from '../types';

interface Props {
  card: PokemonCard;
  onClick: (id: number) => void;
}

function Card({ card, onClick }: Props) {
  return (
    <div className="card" onClick={() => onClick(card.id)}>
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">
          <img src={card.image} alt={card.name} />
          <p>{card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

