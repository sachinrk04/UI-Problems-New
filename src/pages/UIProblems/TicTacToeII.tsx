import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const TicTacToeII = () => {
  const [size, setSize] = useState<number>(3);
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => Array(size).fill(""))
  );
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState<any>(null);

  const onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) return;
    const newValue = Number(value);
    setSize(newValue);
    setBoard(Array.from({ length: newValue }, () => Array(newValue).fill("")));
    setWinner(null);
    setPlayer("X");
  };

  const checkWinner = (
    size: number,
    board: any,
    rowIndex: number,
    colIndex: number,
    player: string
  ) => {
    let rowWinner = true;
    let colWinner = true;
    let diagonalOneWinner = true;
    let diagonalTwoWinner = true;

    // Row
    for (let i = 0; i < size; i++) {
      if (board[rowIndex][i] !== player) rowWinner = false;
    }

    // Col
    for (let i = 0; i < size; i++) {
      if (board[colIndex][i] !== player) colWinner = false;
    }

    // Main diagonal
    if (rowIndex === colIndex) {
      for (let i = 0; i < size; i++) {
        if (board[i][i] !== player) diagonalOneWinner = false;
      }
    } else diagonalOneWinner = false;

    // Anti diagonal
    if (rowIndex + colIndex === size - 1) {
      for (let i = 0; i < size; i++) {
        if (board[i][size - 1 - i] !== player) diagonalTwoWinner = false;
      }
    } else diagonalTwoWinner = false;

    return rowWinner || colWinner || diagonalOneWinner || diagonalTwoWinner;
  };

  const handleOnClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[rowIndex][colIndex] = player;
    setBoard(newBoard);

    if (checkWinner(size, newBoard, rowIndex, colIndex, player)) {
      setWinner(player);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoard(Array.from({ length: size }, () => Array(size).fill("")));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div className="p-4 min-h-screen flex flex-col gap-4 items-center">
      <div>
        <h1 className="text-xl font-bold text-gray-700">NxN Tic-Tac-Toe</h1>
      </div>
      <div className="flex gap-2 items-center">
        <Label className="font-semibold">Board size:</Label>
        <Input
          type="number"
          min={3}
          value={size}
          onChange={(e) => onChangeSize(e)}
          className="flex-1 h-10 rounded-sm"
        />
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
      >
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <div
              key={`${rIndex} - ${cIndex}`}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-lg font-semibold text-gray-600 flex justify-center items-center"
              onClick={() => handleOnClick(rIndex, cIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <div>
        {winner && (
          <div className="text-xl font-semibold text-green-600">
            Winner: {winner}
          </div>
        )}
      </div>
      <div>
        <Button
          variant={"outline"}
          onClick={() => handleReset()}
          className="rounded-sm h-10"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TicTacToeII;
