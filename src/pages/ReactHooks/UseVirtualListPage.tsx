import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { sequentialArray } from "@/lib/utils";
import { useVirtualList } from "@/components/ReactHooksComponents/useVirtualList";

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 800;
const BUFFER = 5;
const UseVirtualListPage = () => {
  const data = useMemo(() => sequentialArray(10000), []);

  const { startIndex, endIndex, totalHeight, handleScroll } = useVirtualList({
    itemCount: data.length,
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    overScan: BUFFER,
  });

  const visibleItems = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useVirtualList" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
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
                  style={{
                    top: actualIndex * ITEM_HEIGHT,
                    height: ITEM_HEIGHT,
                  }}
                >
                  Item #{item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseVirtualListPage;
