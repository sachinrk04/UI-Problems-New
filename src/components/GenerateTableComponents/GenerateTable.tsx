import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const GenerateTable = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [table, setTable] = useState<any[][]>([]);

  const generateTable = () => {
      const dumyTable = Array.from({ length: rows }, () => Array(cols).fill(0));

      let num = 1;

      for (let col = 0; col < cols; col++) {
        if (col % 2 === 0) {
          for (let row = 0; row < rows; row++) {
            dumyTable[row][col] = num++;
          }
        } else {
          for (let row = rows - 1; row >= 0; row--) {
            dumyTable[row][col] = num++;
          }
        }
      }

      setTable(dumyTable)
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full gap-6 p-4">
      <div className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-100 rounded-sm">
        <div className="flex items-center justify-between gap-4">
          <Label className="w-14">Rows</Label>
          <Input
            value={rows === 0 ? "" : rows}
            onChange={(e: any) => setRows(Number(e.target.value))}
            className="w-40 h-8 rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label className="w-14">Columns</Label>
          <Input
            value={cols === 0 ? "" : cols}
            onChange={(e: any) => setCols(Number(e.target.value))}
            className="w-40 h-8 rounded-sm"
          />
        </div>
        <Button className="h-8 rounded-sm" onClick={generateTable}>
          Submit
        </Button>
      </div>

        <div>
          {table.length > 0 && (
            <div className="border">
              {table.map((items, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {items.map((item, colIndex) =>  (
                    <div key={colIndex} className="flex items-center justify-center w-10 h-10 border">{item}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
     
    </div>
  );
};

export default GenerateTable;
