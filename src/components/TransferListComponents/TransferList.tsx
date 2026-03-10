import { useState } from "react";
import List from "./List";
import { Button } from "../ui/button";

type Item = {
  id: number;
  label: string;
  side: "left" | "right";
  checked: boolean;
};

const initialItems: Item[] = [
  { id: 1, label: "HTML", side: "left", checked: false },
  { id: 2, label: "CSS", side: "left", checked: false },
  { id: 3, label: "JavaScript", side: "left", checked: false },
  { id: 4, label: "React", side: "right", checked: false },
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

  const move = (from: "left" | "right", to: "left" | "right", all = false) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.side === from && (all || item.checked)) {
          return { ...item, side: to, checked: false };
        }
        return item;
      })
    );
  };

  const leftItems = items.filter((leftItem) => leftItem.side === "left");
  const rightItems = items.filter((rightItem) => rightItem.side === "right");

  return (
    <div className="flex justify-center p-4">
      <div className="flex gap-4 border rounded-sm">
        <List items={leftItems} toggleCheck={toggleCheck} />
        <div className="flex flex-col gap-4 p-4 border-x">
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("right", "left", true)}>
            {"<<"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("right", "left")}>
            {"<"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("left", "right")}>
            {">"}
          </Button>
          <Button variant={"outline"} className="h-8 rounded-sm" onClick={() => move("left", "right", true)}>
            {">>"}
          </Button>
        </div>
        <List items={rightItems} toggleCheck={toggleCheck} />
      </div>
    </div>
  );
};

export default TransferList;
