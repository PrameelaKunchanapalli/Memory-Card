import './Scoreboard.css';

interface Props {
  score: number;
  bestScore: number;
}

function Scoreboard({ score, bestScore }: Props) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
}

export default Scoreboard;
