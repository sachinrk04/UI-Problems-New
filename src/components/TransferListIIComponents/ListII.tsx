import { useState } from "react";
import CheckboxListII from "./CheckboxListII";
import { Input } from "../ui/input";

const ListII = ({ side, items, onToggle, onToggleAll, onAdd }: any) => {
  const [input, setInput] = useState("");

  const sideItems = items.filter((i) => i.side === side);
  const checkedCount = sideItems.filter((i) => i.checked).length;
  const allChecked = sideItems.length > 0 && sideItems.every((i) => i.checked);
  const someChecked = sideItems.some((i) => i.checked);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const val = input.trim();
    if (!val) return;
    onAdd(val, side);
    setInput("");
  }

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="p-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded px-3 py-2 text-sm"
          placeholder="Add item & press Enter..."
        />
      </div>

      <div className="flex items-center gap-3 p-3 border-t border-b border-gray-200">
        <CheckboxListII
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onChange={() => onToggleAll(side)}
        />
        <span className="text-sm text-gray-700 font-medium">
          {checkedCount} / {sideItems.length} Selected
        </span>
      </div>

      <div className="flex flex-col mt-1">
        {sideItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 border-b border-gray-100 cursor-pointer"
            onClick={() => onToggle(item.id)}
          >
            <CheckboxListII
              checked={item.checked}
              onChange={() => onToggle(item.id)}
            />
            <span className="text-sm text-gray-800">{item.label}</span>
          </div>
        ))}
        {sideItems.length === 0 && (
          <p className="text-xs text-gray-400 py-4 text-center">No items</p>
        )}
      </div>
    </div>
  );
};

export default ListII;
