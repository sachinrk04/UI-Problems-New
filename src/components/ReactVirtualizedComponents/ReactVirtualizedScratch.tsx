import { useCallback, useMemo, useState } from "react";
import { sequentialArray } from "@/lib/utils";

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 800;
const BUFFER = 5;

const ReactVirtualizedScratch = () => {
  const data = useMemo(() => sequentialArray(10000), []);

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e: any) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = data.length * ITEM_HEIGHT;

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleCount = Math.floor(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const endIndex = Math.min(data.length, startIndex + visibleCount + BUFFER);

  const visibleItems = data.slice(startIndex, endIndex);

  return (
    <div
      className={`space-y-4 overflow-auto border rounded-sm relative`}
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={handleScroll}
    >
      <div className={`h-[${totalHeight}px] relative`}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;

          return (
            <div
              key={item}
              className={`absolute left-0 right-0 flex items-center p-2 border-b`}
              style={{ top: actualIndex * ITEM_HEIGHT, height: ITEM_HEIGHT }}
            >
              Item #{item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactVirtualizedScratch;
