import { useEffect, useState } from 'react';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import type { PokemonCard } from './types';
import './App.css';

const TOTAL_CARDS = 12;

function App() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [clickedIds, setClickedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchPokemon = async () => {
    const promises = Array.from({ length: TOTAL_CARDS }, async (_, i) => {
      const id = i + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      return {
        id,
        name: data.name,
        image: data.sprites.front_default,
      };
    });

    const results = await Promise.all(promises);
    setCards(shuffle(results));
  };

  const shuffle = (array: PokemonCard[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (id: number) => {
    if (clickedIds.includes(id)) {
      setScore(0);
      setClickedIds([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBestScore(Math.max(bestScore, newScore));
      setClickedIds([...clickedIds, id]);
    }
    setCards(shuffle(cards));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
