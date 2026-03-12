import { useCallback, useState } from "react";
import LiftingStateUpChild from "./LiftingStateUpChild";

const LiftingStateUpParent = () => {
  const [receivedValue, setReceivedValue] = useState(null);
  const [flash, setFlash] = useState(false);

  const handleChildValue = useCallback((value: any) => {
    setReceivedValue(value);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  }, []);

  return (
    <div className="flex items-start justify-center min-h-full p-6">
      <div className="w-full max-w-md border-2 rounded-md border-primary/70 p-7 bg-primary/10">
        <p className="mb-4 text-xs font-bold tracking-widest uppercase text-opacity-40">
          👨‍👦 Parent Component
        </p>

        {/* Received Value Display */}
        <div
          className={`flex justify-between items-center border rounded-md px-5 py-3 mb-4 transition-all duration-150 ${
            flash
              ? "bg-primary/20 bg-opacity-30 border-primary/50"
              : "bg-primary/40 bg-opacity-10 border-primary/70"
          }`}
        >
          <span className="text-sm">
            Value received from child
          </span>
          <span className="text-4xl font-extrabold text-primary">
            {receivedValue === null ? "—" : receivedValue}
          </span>
        </div>

        {/* Info */}
        <p className="mb-1 text-xs leading-relaxed text-gray-500">
          The parent passes{" "}
          <code className="bg-primary/20 bg-opacity-10 text-yellow-500 text-xs px-1.5 py-0.5 rounded">
            handleChildValue
          </code>{" "}
          as a prop to Child. When the child calls it, the value appears here.
        </p>

        <LiftingStateUpChild onShareValue={handleChildValue} />
      </div>
    </div>
  );
};

export default LiftingStateUpParent;
