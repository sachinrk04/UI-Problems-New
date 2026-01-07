import { useState } from "react";
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
const DiceRollerThree = () => {
  const [count, setCount] = useState<number>(1);
  const [results, setResults] = useState<any[]>([]);
  const rollDice = () => {
    const newResults = [];
    for (let i = 0; i < count; i++) {
      newResults.push(Math.floor(Math.random() * 6) + 1);
    }
    setResults(newResults);
  };
  const renderNumber = (diceNumber: number) => {
    switch (diceNumber) {
      case 1:
        return <Dice1Icon className="w-24 h-24 text-red-500" />;
      case 2:
        return <Dice2Icon className="w-24 h-24 text-black-500" />;
      case 3:
        return <Dice3Icon className="w-24 h-24 text-black-500" />;
      case 4:
        return <Dice4Icon className="w-24 h-24 text-black-500" />;
      case 5:
        return <Dice5Icon className="w-24 h-24 text-black-500" />;
      case 6:
        return <Dice6Icon className="w-24 h-24 text-red-500" />;
    }
  };
  return (
    <div className="p-4">
      {" "}
      <div className="flex flex-col justify-center items-center gap-4">
        {" "}
        <div className="flex gap-2 justify-center items-center">
          {" "}
          <Label>Number of Dice</Label>{" "}
          <Input
            type="number"
            min={1}
            value={count}
            onChange={(e: any) => setCount(e.target.value)}
            className="w-40 h-9 rounded-sm"
          />{" "}
          <Button className="h-9 rounded-sm" onClick={() => rollDice()}>
            {" "}
            Roll{" "}
          </Button>{" "}
        </div>{" "}
        <div className="grid grid-cols-3 gap-4">
          {" "}
          {results.map((result, index) => (
            <div key={index}>{renderNumber(result)}</div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default DiceRollerThree;
