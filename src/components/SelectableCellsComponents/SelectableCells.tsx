import { useEffect, useRef, useState } from "react";

const ROWS = 10;
const COLS = 10;

const SelectableCells = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);

  const gridRef = useRef(null);

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setStart({ row, col });
    setEnd({ row, col });
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    setEnd({ row, col });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const isSelected = (row: number, col: number) => {
    if (!start || !end) return;

    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);

    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        gridRef.current &&
        !(gridRef.current as HTMLElement).contains(e.target)
      ) {
        setStart(null);
        setEnd(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 flex justify-center items-center min-h-full">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 40px)` }}
        ref={gridRef}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {Array.from({ length: ROWS }).map((_, rowIndex) =>
          Array.from({ length: COLS }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              className={`w-10 h-10 border-[0.5px] border-gray-300 cursor-pointer hover:bg-blue-200 ${isSelected(rowIndex, colIndex) && "bg-red-500"}`}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default SelectableCells;
