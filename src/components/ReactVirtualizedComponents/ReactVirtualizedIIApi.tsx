import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 800;
const BUFFER = 5;
const PAGE_SIZE = 50;

type Comment = {
  id: number;
  name: string;
};

const ReactVirtualizedIIApi = () => {
  const [data, setData] = useState<Comment[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const fetchingRef = useRef(false);

  const fetchData = async () => {
    if (fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${pageRef.current}&_limit=${PAGE_SIZE}`,
      );
      const result: Comment[] = await res.json();

      if (result.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setData((prev) => [...prev, ...result]);
      pageRef.current += 1;
    } catch (err) {
      console.error(err);
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = useCallback((e: any) => {
    const el = e.currentTarget;

    setScrollTop(el.scrollTop);

    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

    if (isAtBottom) {
      fetchData();
    }
  }, []);

  // ✅ Virtualization
  const totalHeight = data.length * ITEM_HEIGHT;
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleCount = Math.floor(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const endIndex = Math.min(data.length, startIndex + visibleCount + BUFFER);

  const visibleItems = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex],
  );

  return (
    <div
      className="relative overflow-auto border rounded-sm"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }} className="relative">
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;

          return (
            <div
              key={item.id}
              className="absolute left-0 right-0 flex items-center p-2 bg-white border-b"
              style={{
                top: actualIndex * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
              }}
            >
              {item.id} — {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactVirtualizedIIApi;
