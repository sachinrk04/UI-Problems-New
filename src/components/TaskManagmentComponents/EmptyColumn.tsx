import { memo } from "react";

const EmptyColumn = () => {
  return (
    <div className="p-2 text-center border rounded-sm h-28 bg-gray-50">
      <p className="text-xs text-gray-400 bg">No tasks</p>
    </div>
  );
};

export default memo(EmptyColumn);
