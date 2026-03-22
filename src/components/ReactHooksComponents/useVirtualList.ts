import {useCallback, useState} from "react";

type UseVirtualListProps = {
    itemCount: number;
    itemHeight: number;
    containerHeight: number;
    overScan?: number;
};

export const useVirtualList = ({itemCount, itemHeight, containerHeight, overScan = 5}: UseVirtualListProps) => {
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = useCallback((e: any) => {
        const scrollTop = e.currentTarget.scrollTop;
        setScrollTop(scrollTop);
    }, []);

    const totalHeight = itemCount + itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(itemCount, startIndex + visibleCount + overScan);

    return {startIndex, endIndex, totalHeight, handleScroll};
};
