import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAudioMusic } from "@/hooks/useAudioMusic";
import { generateArray, sleep } from "@/lib/utils";
import { Code } from "lucide-react";
import CodeViewModal from "@/components/CodeViewModal";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { openCommonModal } from "@/store/actions";
import { cocktailShakerSortCode } from "./CocktailShakerSortCode";

// ─── constants ────────────────────────────────────────────────────────────────
const ARRAY_SIZE = 20;
const SLEEP_MS = 200;

// ─── component ────────────────────────────────────────────────────────────────
const CocktailShakerSort = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { commonModal } = useSelector((state: RootState) => state.commonState);
  // lazy initialiser — generateArray called once, not on every render
  const [array, setArray] = useState<number[]>(generateArray(ARRAY_SIZE));
  const [sorting, setSorting] = useState(false);
  const [active, setActive] = useState<[number, number] | []>([]);
  // Set<number> → O(1) .has() instead of O(n) Array.includes()
  const [sortedSet, setSortedSet] = useState<Set<number>>(() => new Set());
  // plain counter instead of storing every array snapshot
  const [moveCount, setMoveCount] = useState(0);

  const { startMusic, updateMusic, stopMusic } = useAudioMusic();

  const isSorted = sortedSet.size === ARRAY_SIZE;

  // ── reset ──────────────────────────────────────────────────────────────────
  const resetArray = useCallback(() => {
    if (sorting) return;
    setArray(generateArray(ARRAY_SIZE));
    setSortedSet(new Set());
    setActive([]);
    setMoveCount(0);
  }, [sorting]);

  // ── sort ───────────────────────────────────────────────────────────────────
  const cocktailSort = useCallback(async () => {
    setSorting(true);
    startMusic();

    const arr = [...array];
    let start = 0;
    let end = arr.length; // fix: was arr.length (off-by-one)
    let swapped = true;
    let moves = 0; // accumulate locally — one setState at the end

    while (swapped) {
      swapped = false;

      // ── pass left → right ──────────────────────────────────────────────
      for (let i = start; i < end; i++) {
        setActive([i, i + 1]);
        updateMusic(arr[i]);

        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          moves++;
          setArray([...arr]);
        }
        await sleep(SLEEP_MS);
      }

      if (!swapped) break;

      // rightmost unsorted index is now in place
      setSortedSet((prev) => new Set(prev).add(end));
      end--;
      swapped = false;

      // ── pass right → left ──────────────────────────────────────────────
      for (let i = end; i > start; i--) {
        setActive([i, i - 1]);
        updateMusic(arr[i]);

        if (arr[i] < arr[i - 1]) {
          [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
          swapped = true;
          moves++;
          setArray([...arr]);
        }
        await sleep(SLEEP_MS);
      }

      // leftmost unsorted index is now in place
      setSortedSet((prev) => new Set(prev).add(start - 1));
      start++;
    }

    // mark everything sorted in one shot
    setSortedSet(new Set(Array.from({ length: arr.length }, (_, i) => i)));
    setActive([]);
    setMoveCount(moves); // single flush
    setSorting(false);
    stopMusic();
  }, [array, startMusic, updateMusic, stopMusic]);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative flex justify-center">
      <Button
        variant={"ghost"}
        className="absolute top-0 right-0 h-8 rounded-sm"
        onClick={() => dispatch(openCommonModal())}
      >
        <Code className="text-primary" />
      </Button>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-600">
          Cocktail Shaker Sort
        </h2>

        <p className="text-sm text-gray-500 w-[330px] text-center">
          A bidirectional Bubble Sort that scans left-to-right then
          right-to-left in each pass.
        </p>

        <div className="px-4 py-1 space-x-8 text-sm text-gray-600 border rounded-sm">
          <span className="text-primary">Time:</span> O(n²){" "}
          <span className="text-primary">Space:</span> O(1)
        </div>

        <div className="flex gap-4">
          <Button
            className="h-8 rounded-sm"
            disabled={sorting}
            onClick={resetArray}
          >
            Generate Array
          </Button>

          <Button
            className="h-8 rounded-sm"
            disabled={sorting || isSorted}
            onClick={cocktailSort}
          >
            Start Sorting
          </Button>
        </div>

        {/* bar chart */}
        <div
          className="px-1 pt-4 border rounded-sm"
          style={{ display: "flex", alignItems: "flex-end", height: `250px` }}
        >
          {array.map((value, idx) => {
            const isActive0 = idx === active[0];
            const isActive1 = idx === active[1];
            const color = sortedSet.has(idx) // O(1) lookup
              ? "bg-green-500"
              : isActive0
                ? "bg-rose-400"
                : isActive1
                  ? "bg-emerald-400"
                  : "bg-gray-400";

            return (
              <div
                key={idx}
                className={`${color} mx-0.5 transition-all`}
                style={{ width: `20px`, height: `${value}px` }}
              />
            );
          })}
        </div>

        {/* number row */}
        <div className="flex gap-2 px-2 py-1 border rounded-sm bg-primary/10">
          {array.map((item, idx) => {
            const color = sortedSet.has(idx) // O(1) lookup
              ? "text-green-500"
              : idx === active[0]
                ? "text-rose-500"
                : idx === active[1]
                  ? "text-emerald-500"
                  : "text-gray-500";

            return (
              <div key={idx} className={`text-sm ${color}`}>
                {item}
              </div>
            );
          })}
        </div>

        <div className="px-4 py-1 space-x-2 text-sm text-gray-600 border rounded-sm">
          <span className="text-primary">Number of moves:</span>{" "}
          <span className="font-semibold text-green-500">{moveCount}</span>
        </div>
      </div>
      {commonModal && <CodeViewModal title="Cocktail Shaker Sort Code" viewCode={cocktailShakerSortCode} />}
    </div>
  );
};

export default CocktailShakerSort;
