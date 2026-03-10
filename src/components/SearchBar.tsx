import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { searchBar } from "@/store/actions";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector((state: RootState) => state.searchQuery);

  const [searchText, setSearchText] = useState(query ?? "");

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchBar(searchText));
    }, 1000); // debounce delay

    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  return (
    <div className="flex-1 hidden max-w-md mx-4 md:block">
      <div className="relative group">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 text-gray-500 font-semibold group-hover:text-primary/90 h-4 w-4`}
        />
        <Input
          type="text"
          value={searchText}
          onChange={handleOnSearch}
          placeholder="Search..."
          className={`w-full pl-10 h-9 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent border-gray-200 bg-gray-50/50 text-primary hover:border-gray-300`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
