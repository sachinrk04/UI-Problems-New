import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const GenerateTable = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [table, setTable] = useState<number[][]>([]);

  const generateTable = () => {
    let count = 1;
    const newTable: number[][] = [];

    for (let r = 0; r < rows; r++) {
      const row: number[] = [];

      for (let c = 0; c < cols; c++) {
        row.push(count++);
      }

      newTable.push(row);
    }

    setTable(newTable);
  };
  
  return (
    <div className="flex flex-col items-center justify-start min-h-full p-4">
      <div className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-100 rounded-sm">
        <div className="flex items-center justify-between gap-4">
          <Label className="w-14">Rows</Label>
          <Input
            value={rows}
            onChange={(e: any) => setRows(e.target.value)}
            className="w-40 h-8 rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label className="w-14">Columns</Label>
          <Input
            value={cols}
            onChange={(e: any) => setCols(e.target.value)}
            className="w-40 h-8 rounded-sm"
          />
        </div>
        <Button className="h-8 rounded-sm" onClick={generateTable}>
          Submit
        </Button>
      </div>

      <div>
        <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
          <tbody>
            {table.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex) => (
                  <td key={cIndex} className="border">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateTable;
