import { useState } from "react";
import { Button } from "../ui/button";

const LiftingStateUpChild = ({ onShareValue }: any) => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 mt-6 border-2 border-green-500 border-opacity-50 border-dashed rounded-md bg-opacity-5">
      <p className="mb-4 text-xs font-bold tracking-widest uppercase">
        🧒 Child Component
      </p>

      {/* Count Display */}
      <div className="flex items-center justify-between px-5 py-3 mb-4 bg-green-500 border border-green-500 border-opacity-25 rounded-md bg-opacity-20">
        <span className="text-sm text-gray-600 text-opacity-60">
          Internal Count
        </span>
        <span className="text-4xl font-extrabold text-green-500">{count}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-3">
        <Button
          onClick={() => setCount((c) => c + 1)}
          className="flex-1 py-3 text-sm font-semibold text-white transition-all duration-150 bg-green-700 rounded-sm hover:bg-green-600 active:scale-95"
        >
          ＋ Increase Count
        </Button>
        <Button
          onClick={() => onShareValue(count)}
          className="flex-1 py-3 text-sm font-semibold text-white transition-all duration-150 rounded-sm bg-primary hover:bg-primary/60 active:scale-95"
        >
          📤 Send to Parent
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-gray-600 text-opacity-30">
        · Button 1 updates child state <br /> 
        · Button 2 calls the parent's function
      </p>
    </div>
  );
};

export default LiftingStateUpChild;
