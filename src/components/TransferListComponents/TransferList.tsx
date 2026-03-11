import { useState } from "react";
import List from "./List";
import { Button } from "../ui/button";

const initialItems = [
  { id: 1, label: "HTML", side: "LEFT", checked: false },
  { id: 2, label: "CSS", side: "LEFT", checked: false },
  { id: 3, label: "JavaScript", side: "LEFT", checked: false },
  { id: 4, label: "React", side: "RIGHT", checked: false },
];

const TransferList = () => {
  const [items, setItems] = useState(initialItems);

  const toggleCheck = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const move = (from: string, to: string, all = false) => {
    setItems((prev: any) =>
      prev.map((item: any) => {
        if (item.side === from && (all || item.checked)) {
          return { ...item, side: to, checked: false };
        }
        return item;
      })
    );
  };

  const leftItems = items.filter((leftItem) => leftItem.side === "LEFT");
  const rightItems = items.filter((rightItem) => rightItem.side === "RIGHT");

  return (
    <div className="flex justify-center p-4">
      <div className="flex gap-4 border rounded-sm">
        <List items={leftItems} toggleCheck={toggleCheck} />
        <div className="flex flex-col gap-4 p-4 border-x">
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("RIGHT", "LEFT", true)}>
            {"<<"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("RIGHT", "LEFT")}>
            {"<"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("LEFT", "RIGHT")}>
            {">"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("LEFT", "RIGHT", true)}>
            {">>"}
          </Button>
        </div>
        <List items={rightItems} toggleCheck={toggleCheck} />
      </div>
    </div>
  );
};

export default TransferList;
