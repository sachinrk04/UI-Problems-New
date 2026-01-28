// Implement a stack data structure in JavaScript that contains the following operations:

//      1. new Stack(): Creates an instance of a Stack class that doesn't contain any items.
//         The constructor does not accept any arguments.
//      2. push(): Pushes an item onto the top of the stack and returns the new length of
//         the stack. Required time complexity: O(1).
//      3. pop(): Removes an item at the top of the stack and returns that item. Required
//         time complexity: O(1).
//      4. isEmpty(): Determines if the stack is empty. Required time complexity: O(1).
//      5. peek(): Returns the item at the top of the stack without removing it from the stack.
//         Required time complexity: O(1).
//      6. length(): Returns the number of items in the stack. Required time complexity: O(1).

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    return this.items.length;
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  length() {
    return this.items.length;
  }
}

const stack = new Stack();
console.log("stack-isEmpty--->", stack.isEmpty()); // true
console.log("stack-push--->", stack.push(1));
console.log("stack-push--->", stack.push(2));
console.log("stack-length--->", stack.length()); // 2
console.log("stack-push--->", stack.push(3));
console.log("stack-peek--->", stack.peek()); // 3
console.log("stack-pop--->", stack.pop()); // 3
console.log("stack-isEmpty--->", stack.isEmpty()); // false
