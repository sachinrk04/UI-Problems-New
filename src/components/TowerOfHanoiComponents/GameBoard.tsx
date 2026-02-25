import Tower from "./Tower";

interface GameBoardProps {
  towers: any;
  onTowerClick: (index: number) => void;
  moves: number;
}

const GameBoard = ({ towers, onTowerClick, moves }: GameBoardProps) => {
  return (
    <div>
      <h2>Moves: {moves}</h2>
      <div className="flex gap-5 bg-slate-200 p-4 rounded-md">
        {towers.map((tower: any, i: number) => (
          <Tower key={i} disks={tower} onClick={() => onTowerClick(i)} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
