import { useState } from "react";
import { Button } from "@/components/ui/button";

const CocktailShakerSort = () => {
  const generateArray = () =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 200) + 20);

  const [array, setArray] = useState<number[]>(generateArray());
  const [sorting, setSorting] = useState(false);
  const [active, setActive] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [sortedHistory, setSortedHistory] = useState<number[][]>([]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const resetArray = () => {
    if (!sorting) {
      const newArr = generateArray();
      setArray(newArr);
      setSortedHistory([newArr]); // initial state
      setSorted([]);
      setActive([]);
    }
  };

  const cocktailSort = async () => {
    setSorting(true);
    startMusic();

    const arr = [...array];
    let start = 0;
    let end = arr.length;
    let swapped = true;

    while (swapped) {
      swapped = false;

      // LEFT → RIGHT
      for (let i = start; i < end; i++) {
        setActive([i, i + 1]);
        updateMusic(arr[i]);
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          setArray([...arr]);
          setSortedHistory((prev) => [...prev, [...arr]]);
        }

        await sleep(100);
      }

      if (!swapped) break;

      setSorted((prev) => [...prev, end]);
      end--;
      swapped = false;

      // RIGHT → LEFT
      for (let i = end - 1; i > start; i--) {
        setActive([i, i - 1]);
        updateMusic(arr[i]);
        if (arr[i] < arr[i - 1]) {
          [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
          swapped = true;
          setArray([...arr]);
          setSortedHistory((prev) => [...prev, [...arr]]);
        }

        await sleep(100);
      }

      setSorted((prev) => [...prev, start - 1]);
      start++;
    }

    // Mark all sorted
    setSorted(Array.from({ length: arr.length }, (_, i) => i));
    setActive([]);
    setSorting(false);
    stopMusic();
  };

  console.log("array-->", sortedHistory);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-600">
          Cocktail Shaker Sort
        </h2>

        <p className="text-sm text-gray-500 w-[330px] text-center">
          A bidirectional Bubble Sort that scans left-to-right then
          right-to-left in each pass.
        </p>

        <div className="border px-4 py-1 rounded-sm space-x-8 text-gray-600 text-sm">
          <span className="text-primary">Time:</span> O(n²)
          <span className="text-primary">Space:</span> O(1)
        </div>

        <div className="flex gap-4">
          <Button className="h-8 rounded-sm" onClick={resetArray}>
            Generate Array
          </Button>

          <Button
            className="h-8 rounded-sm"
            onClick={cocktailSort}
            disabled={sorting}
          >
            Start Sorting
          </Button>
        </div>

        <div
          className="px-1 pt-4 rounded-sm border"
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "250px",
          }}
        >
          {array.map((value, idx) => {
            let color = "bg-gray-400";

            if (sorted.includes(idx)) color = "bg-green-500";
            else if (idx === active[0]) {
              color = "bg-rose-400"; // first active
            } else if (idx === active[1]) {
              color = "bg-emerald-400"; // second active
            }

            return (
              <div
                key={idx}
                className={`${color} mx-0.5 transition-all`}
                style={{
                  width: "20px",
                  height: `${value}px`,
                }}
              />
            );
          })}
        </div>
        {/* <div>
          {sortedHistory &&
            sortedHistory.map((item) => (
              <div className="flex">
                {item.map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center w-10 h-10 border"
                  >
                    {i}
                  </div>
                ))}
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default CocktailShakerSort;

let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
const startMusic = () => {
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

  oscillator = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 100;

  gainNode.gain.value = 0.2;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
};

const updateMusic = (value: number) => {
  if (!oscillator) return;

  // map height → frequency
  oscillator.frequency.setValueAtTime(100 + value * 2, audioCtx!.currentTime);
};

const stopMusic = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }

  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
};
