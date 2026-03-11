import { useState } from "react";
import ListII from "./ListII";
import { Button } from "../ui/button";

const initialItems = [
  { id: 1, label: "HTML", side: "LEFT", checked: false },
  { id: 2, label: "JavaScript", side: "LEFT", checked: false },
  { id: 3, label: "CSS", side: "LEFT", checked: false },
  { id: 4, label: "TypeScript", side: "LEFT", checked: false },
  { id: 5, label: "React", side: "RIGHT", checked: false },
  { id: 6, label: "Angular", side: "RIGHT", checked: false },
  { id: 7, label: "Vue", side: "RIGHT", checked: false },
  { id: 8, label: "Svelte", side: "RIGHT", checked: false },
];

const TransferListII = () => {
  const [items, setItems] = useState(initialItems);
  const [nextId, setNextId] = useState(initialItems.length + 1);

  const checkedLeft = items.filter((i) => i.side === "LEFT" && i.checked);
  const checkedRight = items.filter((i) => i.side === "RIGHT" && i.checked);

  function toggle(id) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    );
  }

  function toggleAll(side) {
    const sideItems = items.filter((i) => i.side === side);
    const allChecked = sideItems.every((i) => i.checked);
    setItems((prev) =>
      prev.map((i) => (i.side === side ? { ...i, checked: !allChecked } : i)),
    );
  }

  function transfer(fromSide, toSide) {
    setItems((prev) =>
      prev.map((i) =>
        i.side === fromSide && i.checked
          ? { ...i, side: toSide, checked: false }
          : i,
      ),
    );
  }

  function addItem(label, side) {
    if (items.some((i) => i.label.toLowerCase() === label.toLowerCase()))
      return;
    setItems((prev) => [...prev, { id: nextId, label, side, checked: false }]);
    setNextId((n) => n + 1);
  }

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="bg-white border rounded-lg flex w-full max-w-2xl">
        <div className="flex-1">
          <ListII
            side="LEFT"
            items={items}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onAdd={addItem}
          />
        </div>

        <div className="flex flex-col items-center justify-center pt-12 px-4 gap-2 border-l border-r border-gray-200">
          <Button
            onClick={() => transfer("RIGHT", "LEFT")}
            disabled={checkedRight.length === 0}
            variant={"outline"}
            className="h-8 rounded-sm"
          >
            {"<"}
          </Button>
          <Button
            onClick={() => transfer("LEFT", "RIGHT")}
            disabled={checkedLeft.length === 0}
            variant={"outline"}
            className="h-8 rounded-sm"
          >
            {">"}
          </Button>
        </div>

        <div className="flex-1">
          <ListII
            side="RIGHT"
            items={items}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onAdd={addItem}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferListII;
