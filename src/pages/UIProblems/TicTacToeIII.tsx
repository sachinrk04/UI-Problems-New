import { useState } from "react";
import { Button } from "@/components/ui/button";

const createBoard = (n: number) =>
  Array.from({ length: n }, () => Array(n).fill(null));

const TicTacToeIII = ({ N = 5, M = 4 }) => {
  const [board, setBoard] = useState(() => createBoard(N));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<any>(null);
  const [moves, setMoves] = useState(0);

  const directions = [
    [0, 1], // →
    [1, 0], // ↓
    [1, 1], // ↘
    [1, -1], // ↙
  ];

  const isValid = (row: number, col: number) =>
    row >= 0 && col >= 0 && row < N && col < N;

  const checkWinner = (rowIndex: number, colIndex: number, player: string) => {
    for (const [dirRow, dirCol] of directions) {
      let count = 1;

      for (let i = 1; i < M; i++) {
        const row = rowIndex + dirRow * i;
        const col = colIndex + dirCol * i;
        if (!isValid(row, col) || board[row][col] !== player) break;
        count++;
      }

      for (let i = 1; i < M; i++) {
        const row = rowIndex - dirRow * i;
        const col = colIndex - dirCol * i;
        if (!isValid(row, col) || board[row][col] !== player) break;
        count++;
      }

      if (count >= M) return true;
    }

    return false;
  };

  const handleOnClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);
    setMoves((prevMoves) => prevMoves + 1);

    if (checkWinner(rowIndex, colIndex, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }
  };

  const resetGame = () => {
    setBoard(createBoard(N));
    setCurrentPlayer("X");
    setWinner(null);
    setMoves(0);
  };

  const status = winner
    ? `Winner: ${winner}`
    : moves === N * N
    ? "Game Draw"
    : `Turn: ${currentPlayer}`;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4">
        <div>{status}</div>
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${N}, 3rem)` }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex - colIndex}`}
                className="w-12 h-12 text-lg font-semibold flex items-center justify-center bg-gray-100"
                onClick={() => handleOnClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
        <div>
          <Button
            variant={"outline"}
            className="rounded-sm"
            onClick={() => resetGame()}
          >
            Resset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeIII;
