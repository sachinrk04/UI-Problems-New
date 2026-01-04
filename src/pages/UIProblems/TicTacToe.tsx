import { Button } from "@/components/ui/button";
import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [onX, setOnX] = useState(true);

  const calculateResult = (data: any) => {
    const resultData = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of resultData) {
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return data[a];
      }
    }
    return null;
  };

  const handleOnClick = (cell: number) => {
    if (board[cell] || calculateResult(board)) return;

    const getNext = board.slice();
    getNext[cell] = onX ? "X" : "O";
    setBoard(getNext);
    setOnX(!onX);
  };

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setOnX(true);
  };

  const renderCell = (cell: number) => {
    return (
      <div
        className="w-12 h-12 border-2 border-white bg-gray-200 flex justify-center items-center text-gray-500 cursor-pointer hover:bg-primary/20"
        onClick={() => handleOnClick(cell)}
      >
        {board[cell]}
      </div>
    );
  };

  const winner = calculateResult(board);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <h2>{winner ? `Winner: ${winner}` : `Next: ${onX ? "X" : "O"}`}</h2>
          </div>
          <div>
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex">
                {renderCell(row * 3 + 0)}
                {renderCell(row * 3 + 1)}
                {renderCell(row * 3 + 2)}
              </div>
            ))}
          </div>
          <div>
            <Button
              variant={"outline"}
              className="h-8 rounded-sm text-gray-500"
              onClick={() => onReset()}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
