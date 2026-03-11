import { Input } from "../ui/input";
import { Label } from "../ui/label";

const List = ({ items, toggleCheck }: any) => {
  return (
    <div className="w-56 space-y-4 flex flex-col justify-center">
      {items.map((item: any) => (
        <Label key={item.id} className="flex items-center ml-5 gap-2">
          <Input
            type="checkbox"
            className="w-5 h-5 bg-primary"
            checked={item.checked}
            onChange={() => toggleCheck(item.id)}
          />
          {item.label}
        </Label>
      ))}
    </div>
  );
};

export default List;
