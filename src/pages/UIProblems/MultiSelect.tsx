import { useEffect, useRef, useState } from "react";

const options = ["React", "Angular", "Vue", "Svelte"];

const MultiSelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const multiSelectRef = useRef(null);
  const toggleOption = (value: any) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        multiSelectRef.current &&
        (multiSelectRef.current as HTMLElement).contains &&
        !(multiSelectRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="p-4">
      <div ref={multiSelectRef} className="w-[250px] relative">
        <div
          className="border p-2 rounded-sm cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div>{selected.length ? selected.join(", ") : "Select Option"}</div>
        </div>
        {open && (
          <div className="border mt-1 rounded-sm absolute w-full z-10">
            {options.map((opt) => (
              <div key={opt} className="p-2" onClick={() => toggleOption(opt)}>
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
