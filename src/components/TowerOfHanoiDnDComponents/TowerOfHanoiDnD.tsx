import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Tower = number[];

const TowerOfHanoiDnD: React.FC = () => {
  const [diskCount, setDiskCount] = useState<number>(3);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [draggedFrom, setDraggedFrom] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    resetGame(diskCount);
  }, [diskCount]);

  const resetGame = (count: number) => {
    const initial: number[] = [];
    for (let i = count; i >= 1; i--) {
      initial.push(i);
    }

    setTowers([initial, [], []]);
    setMoves(0);
    setGameWon(false);
  };

  const handleDragStart = (towerIndex: number) => {
    setDraggedFrom(towerIndex);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedFrom === null || draggedFrom === targetIndex) return;

    const newTowers = towers.map((tower) => [...tower]);
    const disk = newTowers[draggedFrom].pop();

    if (!disk) return;

    const targetTop = newTowers[targetIndex][newTowers[targetIndex].length - 1];

    // Validation rule
    if (targetTop && targetTop < disk) {
      // Invalid move → revert
      newTowers[draggedFrom].push(disk);
      return;
    }

    newTowers[targetIndex].push(disk);
    setTowers(newTowers);
    setMoves((prev) => prev + 1);
    setDraggedFrom(null);

    // Win condition
    if (newTowers[newTowers.length - 1].length === diskCount) {
      setGameWon(true);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center gap-y-4 p-8">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min={3}
          max={8}
          value={diskCount}
          onChange={(e) => setDiskCount(Number(e.target.value))}
          className="border px-3 py-1 h-8 rounded w-20"
        />

        <Button
          size={"sm"}
          onClick={() => resetGame(diskCount)}
          className="bg-blue-500 text-white h-8 px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </Button>
      </div>

      {!gameWon && <p className="font-medium">Moves: {moves}</p>}

      {gameWon && (
        <div className="px-4 py-2 bg-green-500 text-white rounded">
          You solved it in {moves} moves.
        </div>
      )}

      {/* Towers */}
      <div className="flex justify-center items-end gap-4 h-80">
        {towers.map((tower, towerIndex) => (
          <div
            key={towerIndex}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(towerIndex)}
            className="flex items-end justify-center min-w-52 h-full relative pb-2 bg-white rounded-md shadow"
          >
            {/* Pole */}
            <div className="absolute bottom-0 w-2 h-64 bg-gray-700 rounded-t-md" />
            {/* Base */}
            <div className="absolute bottom-0 w-full h-2 bg-gray-700 rounded-md" />
            {/* Disks */}
            <div className="px-4 flex flex-col-reverse items-center">
              {tower.map((disk, diskIndex) => {
                const isTop = diskIndex === tower.length - 1;

                return (
                  <div
                    key={diskIndex}
                    draggable={isTop}
                    onDragStart={() => handleDragStart(towerIndex)}
                    className={`h-6 rounded mb-[0.5px] transition-all duration-300 z-0
                        ${isTop ? "cursor-grab active:cursor-grabbing" : "opacity-70"}
                    `}
                    style={{
                      width: `${disk * 30}px`,
                      backgroundColor: `hsl(${disk * 40}, 70%, 50%)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TowerOfHanoiDnD;
