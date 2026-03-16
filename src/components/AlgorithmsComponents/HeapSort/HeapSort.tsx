import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAudioMusic } from "@/hooks/useAudioMusic";
import { generateArray, sleep } from "@/lib/utils";
import { Code } from "lucide-react";
import CodeViewModal from "@/components/CodeViewModal";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { openCommonModal } from "@/store/actions";
import { heapSortCode } from "./HeapSortCode";

// ─── constants ────────────────────────────────────────────────────────────────
const ARRAY_SIZE = 20;
const SLEEP_MS = 200;

// ─── component ────────────────────────────────────────────────────────────────
const HeapSort = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { commonModal } = useSelector((state: RootState) => state.commonState);

  const [array, setArray] = useState<number[]>(generateArray(ARRAY_SIZE));
  const [sorting, setSorting] = useState(false);
  const [active, setActive] = useState<[number, number] | []>([]);
  const [sortedSet, setSortedSet] = useState<Set<number>>(() => new Set());
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

  // ── heapify ────────────────────────────────────────────────────────────────
  const heapify = async (
    arr: number[],
    n: number,
    i: number,
    movesRef: { moves: number }
  ) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setActive([i, left]);
      updateMusic(arr[left]);
      await sleep(SLEEP_MS);
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setActive([i, right]);
      updateMusic(arr[right]);
      await sleep(SLEEP_MS);
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      setActive([i, largest]);
      updateMusic(arr[i]);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      movesRef.moves++;

      setArray([...arr]);
      await sleep(SLEEP_MS);

      await heapify(arr, n, largest, movesRef);
    }
  };

  // ── sort ───────────────────────────────────────────────────────────────────
  const heapSort = useCallback(async () => {
    setSorting(true);
    startMusic();

    const arr = [...array];
    const n = arr.length;
    const movesRef = { moves: 0 };

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i, movesRef);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      setActive([0, i]);
      updateMusic(arr[0]);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      movesRef.moves++;

      setArray([...arr]);
      setSortedSet((prev) => new Set(prev).add(i));
      await sleep(SLEEP_MS);

      await heapify(arr, i, 0, movesRef);
    }

    // mark all sorted
    setSortedSet(new Set(Array.from({ length: n }, (_, i) => i)));
    setActive([]);
    setMoveCount(movesRef.moves);
    setSorting(false);
    stopMusic();
  }, [startMusic, array, stopMusic, heapify, updateMusic]);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative flex justify-center">
      <Button
        variant="ghost"
        className="absolute top-0 right-0 h-8 rounded-sm"
        onClick={() => dispatch(openCommonModal())}
      >
        <Code className="text-primary" />
      </Button>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-600">Heap Sort</h2>

        <p className="text-sm text-gray-500 w-[330px] text-center">
          Builds a Max-Heap, then repeatedly extracts the maximum element
          to sort the array.
        </p>

        <div className="px-4 py-1 space-x-8 text-sm text-gray-600 border rounded-sm">
          <span className="text-primary">Time:</span> O(n log n)
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
            onClick={heapSort}
          >
            Start Sorting
          </Button>
        </div>

        {/* bar chart */}
        <div
          className="px-1 pt-4 border rounded-sm"
          style={{ display: "flex", alignItems: "flex-end", height: "250px" }}
        >
          {array.map((value, idx) => {
            const isActive0 = idx === active[0];
            const isActive1 = idx === active[1];

            const color = sortedSet.has(idx)
              ? "bg-green-500"
              : isActive0
                ? "bg-rose-400"
                : isActive1
                  ? "bg-emerald-400"
                  : "bg-gray-400";

            return (
              <div
                key={idx}
                className={`${color} mx-0.5 transition-all duration-150`}
                style={{ width: "20px", height: `${value}px` }}
              />
            );
          })}
        </div>

        {/* number row */}
        <div className="flex gap-2 px-2 py-1 border rounded-sm bg-primary/10">
          {array.map((item, idx) => {
            const color = sortedSet.has(idx)
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
          <span className="text-primary">Number of swaps:</span>
          <span className="font-semibold text-green-500">{moveCount}</span>
        </div>
      </div>

      {commonModal && (
        <CodeViewModal
          title="Heap Sort Code"
          viewCode={heapSortCode}
        />
      )}
    </div>
  );
};

export default HeapSort;