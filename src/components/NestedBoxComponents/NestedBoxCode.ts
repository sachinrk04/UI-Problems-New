export const nestedBoxCode = {
  JAVASCRIPT: `
import { useState } from "react";

const NestedBox = () => {
  const [box, setBox] = useState([]);

  const handleBox = () => {
    const newBox = <NestBox key={box.length} />;
    setBox([...box, newBox]);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <div
        className="w-8 h-8 border-2 border-gray-500 cursor-pointer"
        onClick={handleBox}
      ></div>
      <div className="my-1 ml-8">{box}</div>
    </div>
  );
};

export default NestedBox;
`
};
