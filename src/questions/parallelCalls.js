const apiSimulater = (start, end) => {};

const getData = (startValue, endValue, limit, noOFParallelCalls) => {};

getData(2, 17, 5, 3).then((data) => console.log(data));

// size : [2, 6]
// size : [7, 11]
// size : [12, 16]
// size : [17]

// output : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
