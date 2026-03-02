import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import GameBoard from "./GameBoard";

type Tower = number[];

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const TowerOfHanoi: React.FC = () => {
  const [diskCount, setDiskCount] = useState<number>(3);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isSolving, setIsSolving] = useState<boolean>(false);

  // Initialize Towers
  useEffect(() => {
    resetGame(diskCount);
  }, [diskCount]);

  const resetGame = (count: number) => {
    const initialTower: number[] = [];
    for (let i = count; i >= 1; i--) {
      initialTower.push(i);
    }

    setTowers([initialTower, [], []]);
    setMoves(0);
    setIsSolving(false);
  };

  const moveDisk = (from: number, to: number) => {
    setTowers((prev) => {
      const newTowers = prev.map((tower) => [...tower]);
      const disk = newTowers[from].pop();
      if (disk) {
        newTowers[to].push(disk);
      }
      return newTowers;
    });
    setMoves((prev) => prev + 1);
  };

  const solveHanoi = async (
    n: number,
    from: number,
    to: number,
    aux: number
  ) => {
    if (n === 0) return;

    await solveHanoi(n - 1, from, aux, to);
    await sleep(500);
    moveDisk(from, to);
    await solveHanoi(n - 1, aux, to, from);
  };

  const handleSolve = async () => {
    if (isSolving) return;
    setIsSolving(true);
    await solveHanoi(diskCount, 0, 2, 1);
    setIsSolving(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      {/* Controls */}
      <div className="flex items-center">
        <Input
          type="number"
          min={1}
          max={8}
          value={diskCount}
          disabled={isSolving}
          onChange={(e) => setDiskCount(Number(e.target.value))}
          className="border px-3 py-1 h-8 rounded w-40"
        />
      </div>

     
     <GameBoard towers={towers} moves={moves} />

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          size={"sm"}
          onClick={() => resetGame(diskCount)}
          className="bg-blue-500 text-white px-4 h-8 py-2 rounded hover:bg-red-600"
          disabled={isSolving}
        >
          Reset
        </Button>

        <Button
          size={"sm"}
          onClick={handleSolve}
          className="bg-primary text-white px-4 h-8 py-2 rounded hover:bg-green-600"
          disabled={isSolving}
        >
          Auto Solve
        </Button>
      </div>
    </div>
  );
};

export default TowerOfHanoi;