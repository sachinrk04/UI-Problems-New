import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const DebounceTwo = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => {
      console.log("Call api:", value);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="p-4 flex justify-center">
      <Input
        className="w-2/6"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DebounceTwo;
