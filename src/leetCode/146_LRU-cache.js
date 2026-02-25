var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;

  const value = this.map.get(key);
  this.map.delete(key);
  this.map.set(key, value);

  return value;
};

LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.map.delete(key);
  }

  this.map.set(key, value);

  if (this.map.size > this.capacity) {
    const lruKey = this.map.keys().next().value;
    this.map.delete(lruKey);
  }
};

// Example-
const input = [
  ("LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"),
][([2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4])];

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
console.log("get--->", lRUCache.get(1));
console.log("get--->", lRUCache.get(1));
// Output [(null, null, null, 1, null, -1, null, -1, 3, 4)];
