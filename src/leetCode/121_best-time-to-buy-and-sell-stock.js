// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a
// different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve
// any profit, return 0.

// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// Example 2:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Initialize
//      minPrice = prices[0]
//      maxProfit = 0
//
//  2. Loop from day 1 to n-1
//      If prices[i] < minPrice → update minPrice
//      Else calculate profit = prices[i] - minPrice
//      Update maxProfit = max(maxProfit, profit)
//
//  3. Return maxProfit
// ---------------------------------------------------------
// ---------------------------------------------------------
function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
  }

  return maxProfit;
}
// ---------------------------------------------------------
// Example
// const prices = [7, 1, 5, 3, 6, 4];
// ---------------------------------------------------------
const prices = [7, 6, 4, 3, 1];
// ---------------------------------------------------------
console.log("maxProfit--->", maxProfit(prices));
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
//        prices = [7,1,5,3,6,4]
//
//        | Day | Price | Min Price | Profit Today | Max Profit |
//        | --- | ----- | --------- | ------------ | ---------- |
//        | 0   | 7     | 7         | -            | 0          |
//        | 1   | 1     | 1         | -            | 0          |
//        | 2   | 5     | 1         | 4            | 4          |
//        | 3   | 3     | 1         | 2            | 4          |
//        | 4   | 6     | 1         | 5            | 5          |
//        | 5   | 4     | 1         | 3            | 5          |
//
// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
function maxProfit_1ms(prices) {
  let min = prices[0],
    max = 0;
  for (let i = 1, n = prices.length; i < n; i++) {
    const value = prices[i];
    if (value < min) min = value;
    else if (value - min > max) max = value - min;
  }
  return max;
}
// ---------------------------------------------------------
// ---------------------------------------------------------
