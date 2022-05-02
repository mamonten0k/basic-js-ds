const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  front;
  rear;
  size = 1;
  queue = [];

  constructor() {
    this.front = 0;
    this.rear = this.size - 1;
  }

  getUnderlyingList() {
    return this.queue
      .slice(this.front, this.rear + 1)
      .reduceRight((result, node) => {
        if (!result) return node;
        node.next = result;
        return node;
      });
  }

  enqueue(value) {
    this.rear = this.nextPos(this.rear);
    this.queue[this.rear] = new ListNode(value);
    this.size++;
  }

  dequeue() {
    let callRes = this.queue[this.front].value;
    this.front = this.nextPos(this.front);
    return callRes;
  }

  nextPos(pos) {
    return (pos + 1) % this.size;
  }
}

module.exports = {
  Queue,
};
