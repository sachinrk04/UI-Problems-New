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

  function toggle(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  function toggleAll(side: string) {
    const sideItems = items.filter((item) => item.side === side);
    const allChecked = sideItems.every((item) => item.checked);
    setItems((prev) =>
      prev.map((item) =>
        item.side === side ? { ...item, checked: !allChecked } : item,
      ),
    );
  }

  function transfer(fromSide: string, toSide: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.side === fromSide && item.checked
          ? { ...item, side: toSide, checked: false }
          : item,
      ),
    );
  }

  function addItem(label: string, side: string) {
    if (
      items.some((item) => item.label.toLowerCase() === label.toLowerCase())
    ) {
      return;
    }
    setItems((prev) => [
      ...prev,
      { id: items.length + 1, label, side, checked: false },
    ]);
  }

  const leftItemsChecked = items.filter(
    (item) => item.side === "LEFT" && item.checked,
  );
  const righItemsChecked = items.filter(
    (item) => item.side === "RIGHT" && item.checked,
  );

  return (
    <div className="min-h-full flex justify-center items-start p-6">
      <div className="border rounded-lg flex w-1/2">
        <ListII
          side="LEFT"
          items={items}
          onToggle={toggle}
          onToggleAll={toggleAll}
          onAdd={addItem}
        />

        <div className="flex flex-col items-center justify-center px-4 gap-2 border-x">
          <Button
            onClick={() => transfer("RIGHT", "LEFT")}
            disabled={righItemsChecked.length === 0}
            variant={"outline"}
            className="h-8 rounded-sm"
          >
            {"<"}
          </Button>
          <Button
            onClick={() => transfer("LEFT", "RIGHT")}
            disabled={leftItemsChecked.length === 0}
            variant={"outline"}
            className="h-8 rounded-sm"
          >
            {">"}
          </Button>
        </div>

        <ListII
          side="RIGHT"
          items={items}
          onToggle={toggle}
          onToggleAll={toggleAll}
          onAdd={addItem}
        />
      </div>
    </div>
  );
};

export default TransferListII;
