import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (msTime: any) => {
    const minutes = Math.floor(msTime / 60000);
    const seconds = Math.floor((msTime % 60000) / 1000);
    const milliseconds = Math.floor((msTime % 1000));
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0",
    )} : ${String(milliseconds).padStart(2, "0")}`;
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 border border-gray-200 rounded-sm">
        <h2 className="text-2xl font-semibold text-primary">
          {formatTime(time)}
        </h2>
        <div className="space-x-8">
          <Button className="w-24 h-8 rounded-sm" onClick={handleStartPause}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button className="w-24 h-8 rounded-sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
