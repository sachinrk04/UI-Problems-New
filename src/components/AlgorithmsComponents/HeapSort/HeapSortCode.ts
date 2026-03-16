export const heapSortCode = {
  JAVASCRIPT : `
// Heap Sort Implementation (Max-Heap)

function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // ── Build Max Heap ─────────────────────────────────────
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // ── Extract elements from heap one by one ──────────────
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call heapify on reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], heapSize: number, rootIndex: number): void {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  // If left child is larger than root
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== rootIndex) {
    // Swap
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

    // Recursively heapify the affected subtree
    heapify(arr, heapSize, largest);
  }
}


// Example
const arr = [4, 10, 3, 5, 1];
console.log(heapSort(arr)); // [1, 3, 4, 5, 10]
`,
};