import { useMemo } from "react";

export const useSearchBar = (data: any[], query: string, keys: string[]) => {
  const filteredData = useMemo(() => {
    if (!query) return data;

    const lowerCaseQuery = query.toLowerCase();

    return data.filter((item) =>
      keys.some((key) =>
        String(item[key]).toLowerCase().includes(lowerCaseQuery),
      ),
    );
  }, [data, query, keys]);

  return filteredData;
};
