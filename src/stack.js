const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  constructor() {
    this.tail = null;
  }

  push(element) {
    if (this.tail === null) {
      this.tail = new Stack.Node(element, null);
      this.tail.next = this.tail;
    } else {
      let node = new Stack.Node(element, this.tail.next);
      this.tail.next = node;
    }
  }

  pop() {
    let result;
    if (this.tail == null) return -1;
    if (this.tail.next == this.tail) {
      result = this.tail.value;
      this.tail = null;
      return result;
    }
    result = this.tail.next;
    this.tail.next = result.next;
    return result.value;
  }

  peek() {
    if (this.tail == null) return -1;
    if (this.tail.next == this.tail) {
      return this.tail.value;
    }
    return this.tail.next.value;
  }
}

Stack.Node = class {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
};

module.exports = {
  Stack,
};
