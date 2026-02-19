import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const BirthYearHistogram = () => {
  const [histogram, setHistogram] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
      setLoading(true);
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=200&min=1950&max=2020&col=1&base=10&format=plain",
      );

      const text = await response.text();
      const yearList = text.trim().split(/\s+/).map(Number);
      const binned = binYears(yearList, 10);
      setHistogram(binned);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function binYears(years: any, step = 5) {
    const bins: any = {};

    for (const year of years) {
      const start = Math.floor(year / step) * step;
      bins[start] = (bins[start] || 0) + 1;
    }

    return Object.keys(bins)
      .sort((a: any, b: any) => a - b)
      .map((start) => ({
        label: `${start}`,
        count: bins[start],
      }));
  }

  const maxCount = Math.max(...histogram.map((h: any) => h.count));

  return (
    <>
      <div className="flex items-end gap-2 h-[400px] border-l-2 border-b-2 px-2 box-content overflow-x">
        {histogram.map((bin: any, index: number) => {
          const heightPercent = (bin.count / maxCount) * 100;
          return (
            <div
              key={index}
              className="flex flex-col justify-end items-center h-full relative"
            >
              <div
                className="w-10 bg-primary transition-[height] duration-300 ease-in-out"
                style={{
                  height: `${heightPercent}%`,
                }}
                title={`Count: ${bin.count}`}
              />

              <span className="mt-2 text-sm absolute -bottom-7">
                {bin.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Button className="w-24 h-8 rounded-sm disabled:bg-primary/30" onClick={fetchData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>
      </div>
    </>
  );
};

export default BirthYearHistogram;
