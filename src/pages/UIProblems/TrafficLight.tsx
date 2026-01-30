import { useEffect, useState } from "react";

const LIGHTSEQUENCE = [
  { light: "GREEN", duration: 3000 },
  { light: "YELLOW", duration: 1000 },
  { light: "RED", duration: 4000 },
];

const TrafficLight = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % LIGHTSEQUENCE.length);
    }, LIGHTSEQUENCE[activeIndex].duration);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const activeLight = LIGHTSEQUENCE[activeIndex].light;

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`flex flex-col gap-4 p-3 bg-gray-900 rounded-md`}>
            <div
              className={`w-16 h-16 ${
                activeLight === "RED" ? "bg-red-500" : "bg-gray-500"
              } rounded-full`}
            />
            <div
              className={`w-16 h-16 ${
                activeLight === "YELLOW" ? "bg-yellow-500" : "bg-gray-500"
              } rounded-full`}
            />
            <div
              className={`w-16 h-16 ${
                activeLight === "GREEN" ? "bg-green-500" : "bg-gray-500"
              } rounded-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLight;
