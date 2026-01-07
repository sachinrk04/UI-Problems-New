import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dice1Icon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  Dice5Icon,
  Dice6Icon,
} from "lucide-react";

const DiceRollerOne = () => {
  const [dice, setDice] = useState(1);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);
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
      <div className="flex flex-col justify-center items-center gap-4 h-[50vh]">
        <div className="w-[100px] h-[100px] rounded-md flex justify-center items-center text-lg font-semibold">
          {renderNumber(dice)}
        </div>
        <Button className="rounded-sm w-24" onClick={() => rollDice()}>
          Roll Dice
        </Button>
      </div>
    </div>
  );
};

export default DiceRollerOne;
