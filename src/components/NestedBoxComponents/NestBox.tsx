import { useState } from "react";

const NestBox = () => {
  const [box, setBox] = useState<any>([]);

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
      <div className="ml-8 my-[1px]">{box}</div>
    </div>
  );
};

export default NestBox;
