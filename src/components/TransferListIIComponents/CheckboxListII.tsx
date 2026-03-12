import { Check, Minus } from "lucide-react";

const CheckboxListII = ({ checked, indeterminate, onChange }: any) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`h-5 w-5 cursor-pointer border-2 rounded flex items-center justify-center ${
        checked || indeterminate
          ? "bg-primary border-primary"
          : "bg-white border-gray-300"
      }`}
    >
      {indeterminate && !checked ? (
        <Minus strokeWidth={3} className="text-white" />
      ) : checked ? (
        <Check strokeWidth={3} className="text-white" />
      ) : null}
    </div>
  );
};

export default CheckboxListII;
