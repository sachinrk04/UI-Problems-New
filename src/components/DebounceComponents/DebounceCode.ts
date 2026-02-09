export const debounceCode = {
  JAVASCRIPT: `
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const DebounceOne = () => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debounceValue) {
      console.log("Call api:", debounceValue);
    }
  }, [debounceValue]);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <Input
          className="w-2/6"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DebounceOne;
`,
};
