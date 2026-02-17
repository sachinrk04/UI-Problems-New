const apiSimulater = (start, end) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [];
      for (let i = start; i <= end; i++) res.push(i);
      resolve(res);
    }, Math.random() * 500);
  });
};

const getData = async (startValue, endValue, limit, noOFParallelCalls) => {
  const ranges = [];

  // Step 1: create chunks
  for (let i = startValue; i <= endValue; i += limit) {
    ranges.push([i, Math.min(i + limit - 1, endValue)]);
  }

  const result = [];

  // Step 2: process in parallel batches
  for (let i = 0; i < ranges.length; i += noOFParallelCalls) {
    const batch = ranges.slice(i, i + noOFParallelCalls);

    const responses = await Promise.all(
      batch.map(([s, e]) => apiSimulater(s, e)),
    );

    responses.forEach((r) => result.push(...r));
  }

  return result;
};

getData(2, 17, 5, 3).then((data) => console.log(data));

// size : [2, 6] = [start, end]
// size : [7, 11] = [start, end]
// size : [12, 16] = [start, end]
// size : [17] = [start, end]

// output : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
