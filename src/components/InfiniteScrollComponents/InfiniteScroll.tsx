import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [dataFetching, setDataFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (!hasMore) return;

    try {
      setDataFetching(true);
      const getRes = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      );
      const data = await getRes.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev: any) => [...prev, ...data]);
    } catch (error) {
      console.log("error--->", error);
    } finally {
      setDataFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleInfiniteScroll = (e: any) => {
    if (dataFetching || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div
      className="h-[calc(100vh-10rem)] space-y-4 overflow-auto p-4"
      onScroll={handleInfiniteScroll}
    >
      {items.length > 0 &&
        items.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 p-4 border border-gray-100 rounded-sm"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.body}</p>
          </div>
        ))}
      {dataFetching && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
