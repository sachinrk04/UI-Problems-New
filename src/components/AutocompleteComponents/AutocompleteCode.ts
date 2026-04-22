export const autocompleteCode = {
  JAVASCRIPT: `
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const Autocomplete = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const containerRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Debounced filter — waits 500ms after the user stops typing
  useEffect(() => {
    if (!query) {
      setOptions([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      const results = data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(results);
      setOpen(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, data]);

  // Close dropdown when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (options.length > 0) setOpen(true);
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
          <div className="absolute w-full mt-1 overflow-auto bg-white border shadow rounded-xl max-h-60">
            {options.map((option) => (
              <div
                key={option.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
`,
  TYPESCRIPT: `
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

type Option = {
  id: number;
  title: string;
};

const Autocomplete = () => {
  const [data, setData] = useState<Option[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Option[] = await res.json();
      setData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Debounced filter — waits 500ms after the user stops typing
  useEffect(() => {
    if (!query) {
      setOptions([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      const results = data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(results);
      setOpen(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, data]);

  // Close dropdown when clicking outside the container
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (options.length > 0) setOpen(true);
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
          <div className="absolute w-full mt-1 overflow-auto bg-white border shadow rounded-xl max-h-60">
            {options.map((option) => (
              <div
                key={option.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
`,
};
