import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

type Option = {
  id: number;
  title: string;
};

const Autocomplete = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("error--->", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!query) {
      setOptions([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const responce = data.filter((user: any) =>
        user.title.toLowerCase().includes(query.toLowerCase()),
      );
      setOptions(responce);
      setOpen(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, data]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    if (options.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="relative w-1/2" ref={containerRef}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 px-4 py-3 rounded-xl"
          placeholder="Search..."
          onFocus={handleFocus}
        />
        {open && options.length > 0 && (
          <div className="absolute w-full bg-white border rounded-xl shadow mt-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {data.length > 0 && (
        <div className="w-1/2 bg-white border rounded-xl h-[calc(100vh-15.25rem)] overflow-auto">
          {data.map((option: any) => (
            <div
              key={option.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.title}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Autocomplete;
