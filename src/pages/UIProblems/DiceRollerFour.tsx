import { useCallback, useMemo, useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dice1Icon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  Dice5Icon,
  Dice6Icon,
} from "lucide-react";

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

const DICEICONS: Record<DiceValue, JSX.Element> = {
  1: <Dice1Icon className="w-24 h-24 text-red-500" />,
  2: <Dice2Icon className="w-24 h-24" />,
  3: <Dice3Icon className="w-24 h-24" />,
  4: <Dice4Icon className="w-24 h-24" />,
  5: <Dice5Icon className="w-24 h-24" />,
  6: <Dice6Icon className="w-24 h-24 text-red-500" />,
};

const getRandomDice = (): DiceValue =>
  (Math.floor(Math.random() * 6) + 1) as DiceValue;
const DiceRollerFour = () => {
  const [count, setCount] = useState<number>(1);
  const [results, setResults] = useState<DiceValue[]>([]);

  const rollDice = useCallback(() => {
    setResults(Array.from({ length: count }, getRandomDice));
  }, [count]);

  const renderedDice = useMemo(
    () =>
      results.map((result, index) => (
        <div key={index}>{DICEICONS[result]}</div>
      )),
    [results]
  );

  const renderCol = useMemo(() => {
    if (count < 10) return "grid-cols-3";
    if (count <= 20) return "grid-cols-4";
    if (count <= 40) return "grid-cols-8";
    return "grid-cols-10";
  }, [count]);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex gap-2 justify-center items-center">
          <Label>Number of Dice</Label>
          <Input
            type="number"
            min={1}
            value={count}
            onChange={(e: any) => setCount(e.target.value)}
            className="w-40 h-9 rounded-sm"
          />
          <Button className="h-9 rounded-sm" onClick={() => rollDice()}>
            Roll
          </Button>
        </div>
        <div className={`grid ${renderCol} gap-4`}>{renderedDice}</div>
      </div>
    </div>
  );
};

export default DiceRollerFour;
