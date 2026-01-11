import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GridLightsII = () => {
  const [size, setSize] = useState<number>(5);
  const [active, setActive] = useState(new Set());
  const [order, setOrder] = useState<number[]>([]);

  const totalCells = size % 2 === 1 ? size * size - 1 : size * size;
  const centerIndex = size % 2 === 1 ? Math.floor((size * size) / 2) : -1;

  const sizeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSize(value);
  };

  const handleClick = (index: number) => {
    if (active.has(index)) return;

    setActive((prev) => new Set(prev).add(index));
    setOrder((prev) => [...prev, index]);
  };

  useEffect(() => {
    setActive(new Set());
    setOrder([]);
  }, [size]);

  useEffect(() => {
    if (order.length !== totalCells) return;

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
  }, [order, totalCells]);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4">
          <Label>Size:</Label>
          <Input
            type="number"
            min={3}
            value={size}
            onChange={(e: any) => sizeOnChange(e)}
            className="h-9"
          />
        </div>
        <div
          className={`grid gap-4`}
          style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            if (i === centerIndex)
              return (
                <div
                  key={i}
                  className="w-12 h-12 flex justify-center items-center bg-red-300 rounded-full"
                />
              );

            return (
              <div
                key={i}
                className={`w-12 h-12 border flex justify-center items-center cursor-pointer ${
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

export default GridLightsII;
