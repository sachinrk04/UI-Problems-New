import { useState } from "react";
import GameBoard from "./GameBoard";

const getInitialState = (n: number) => ({
  towers: [Array.from({ length: n }, (_, i) => n - i), [], []],
  selectedTower: null,
  moves: 0,
  totolDisks: n,
});

const TowerOfHanoi = () => {
  const [game, setGame] = useState(getInitialState(8));

  const handleTowerClick = (index) => {
    if (game.selectedTower === null) {
      setGame({ ...game, selectedTower: index });
      return;
    }

    const from = game.selectedTower;
    const to = index;

    if (from === to) {
      setGame({ ...game, selectedTower: null });
      return;
    }

    const canMove = (from, to, towers) => {
      if (!towers[from].length) return false;
      const fromDisk = towers[from][towers[from].length - 1];
      const toDisk = towers[to][towers[to].length - 1];
      return !toDisk || fromDisk < toDisk;
    };

    if (canMove(from, to, game.towers)) {
      const newTowers = game.towers.map((t) => [...t]);
      const disk = newTowers[from].pop();
      newTowers[to].push(disk);

      setGame({
        ...game,
        towers: newTowers,
        moves: game.moves + 1,
        selectedTower: null,
      });
    } else {
      setGame({ ...game, selectedTower: null });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <GameBoard
        towers={game.towers}
        onTowerClick={handleTowerClick}
        moves={game.moves}
      />
    </div>
  );
};

export default TowerOfHanoi;
