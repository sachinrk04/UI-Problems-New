import Tower from "./Tower";

interface GameBoardProps {
  towers: any;
  moves: number;
}

const GameBoard = ({ towers, moves }: GameBoardProps) => {
  return (
    <>
      <p className="font-medium m-0">Moves: {moves}</p>
      <div className="flex justify-center items-end gap-x-16 h-80 bg-gray-50 p-4 shadow-md rounded-md">
        {towers.map((tower: any, towerIndex: any) => (
          <Tower key={towerIndex} tower={tower}  />
        ))}
      </div>
    </>
  );
};

export default GameBoard;
