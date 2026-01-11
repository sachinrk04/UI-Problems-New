import { useEffect, useState } from "react";

const SIZE = 3;
const TOTAL_CELLS = SIZE * SIZE - 1;
const GridLights = () => {
  const [active, setActive] = useState(new Set());
  const [order, setOrder] = useState<number[]>([]);

  const centerIndex = Math.floor((SIZE * SIZE) / 2);

  const handleClick = (index: number) => {
    if (active.has(index)) return;

    setActive((prev) => new Set(prev).add(index));
    setOrder((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (order.length !== TOTAL_CELLS) return;

    let index = order.length;
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = new Set(prev);
        next.delete(order[index]);
        return next;
      });
      index--;

      if (index < 0) {
        clearInterval(interval);
        setOrder([]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [order]);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center">
        <div className="grid gap-4 grid-cols-3">
          {Array.from({ length: SIZE * SIZE }).map((_, i: number) => {
            if (i === centerIndex)
              return (
                <div
                  key={i}
                  className="flex justify-center items-center bg-red-300 rounded-full"
                />
              );

            return (
              <div
                key={i}
                className={`w-16 h-16 cursor-pointer border flex justify-center items-center ${
                  active.has(i) && "bg-green-500"
                }`}
                onClick={() => handleClick(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GridLights;
