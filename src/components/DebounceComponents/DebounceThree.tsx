import { useState } from "react";
import { Input } from "../ui/input";

const DebounceThree = () => {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState<any>(null);

  const handleChange = (e: any) => {
    const val = e.target.value;
    setValue(val);

    // clear previous timer
    if (timer) {
      clearTimeout(timer);
    }

    // create new timer
    const newTimer = setTimeout(() => {
      if (val) {
        console.log("Call api:", val);
      }
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <div className="p-4 flex justify-center">
      <Input
        className="w-2/6"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DebounceThree;
