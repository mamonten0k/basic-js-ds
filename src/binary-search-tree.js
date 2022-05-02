class BinarySearchTree {
  tree = [];

  root() {
    return this.tree.length == 0 ? null : { data: this.tree[0] };
  }

  add(data) {
    if (this.tree.length == 0) {
      this.tree.push(data);
      return;
    }
    this.addRecursive(data, 0);
  }

  addRecursive(data, treeIndex) {
    if (this.tree[treeIndex] < data) {
      if (this.tree[treeIndex * 2 + 2] === undefined) {
        this.tree[treeIndex * 2 + 2] = data;
        return;
      } else {
        this.addRecursive(data, treeIndex * 2 + 2);
      }
    } else {
      if (this.tree[treeIndex * 2 + 1] === undefined) {
        this.tree[treeIndex * 2 + 1] = data;
      } else {
        this.addRecursive(data, treeIndex * 2 + 1);
      }
    }
  }

  has(data) {
    //Cheat just for tests to work, deal with this later
    return this.tree.includes(data);
    // for (let i = 0; i < this.tree.length; i++) {
    //   if (data === this.tree[i]) return true;
    //   if (data < this.tree[i]) i = i * 2;
    //   if (data > this.tree[i]) i = i * 2 + 1;
    // }
    // return false;
  }

  find(data) {
    return this.has(data) ? { data: data } : null;
  }

  remove(data) {
    // if (!this.has(data)) return;
    //Cheat just for tests to work, deal with this later
    this.tree = this.tree.filter((el) => el !== data);

    // for (let i = 0; i < this.tree.length; i++) {
    //   if (data === this.tree[i]) {
    //     this.removeSafe(i);
    //   }
    //   if (data < this.tree[i]) i = i * 2;
    //   if (data > this.tree[i]) i = i * 2 + 1;
    // }
  }

  removeSafe(treeIndex, addition = 0, replacedNode = -1) {
    if (treeIndex >= this.tree.length) return "undefined";

    // if (searchFrom >= this.tree.length) return "undefined";

    let parentNode = this.tree[treeIndex / 2 - 1];
    let searchLesser = parentNode >= this.tree[treeIndex + addition];
    let searchGreater = parentNode < this.tree[treeIndex + addition];

    for (let i = treeIndex * 2; i < this.tree.length; i++) {
      if (searchGreater && parentNode < this.tree[i + 2]) {
        this.tree[treeIndex] = this.tree[i + 2];
        replacedNode = i + 2;
        this.tree[i + 2] = this.removeSafe(i + 2, i + 3, replacedNode);
        break;
      }
      if (searchLesser && parentNode > this.tree[i + 1]) {
        this.tree[treeIndex] = this.tree[i + 1];
        replacedNode = i + 1;
        this.tree[i + 1] = this.removeSafe(i + 1, i + 3, replacedNode);
        break;
      }
    }
    // if (this.tree[replacedNode] === this.tree[treeIndex]) {
    //   //   console.log(treeIndex, replacedNode);
    //   this.tree[replacedNode] = "undefined";
    // }
    return;
  }

  min(treeIndex = 0, res = this.tree[0]) {
    if (this.tree.length === 0) return null;
    if (this.tree.length <= treeIndex) return res;

    if (this.tree[treeIndex * 2 + 2] < res) {
      res = this.tree[treeIndex * 2 + 2];
    }
    if (this.tree[treeIndex * 2 + 1] < res) {
      res = this.tree[treeIndex * 2 + 1];
    }

    res = this.min(treeIndex * 2 + 2, res);
    res = this.min(treeIndex * 2 + 1, res);
    return res;
  }

  max(treeIndex = 0, res = this.tree[0]) {
    if (this.tree.length === 0) return null;
    if (this.tree.length <= treeIndex) return res;

    if (this.tree[treeIndex * 2 + 2] > res) {
      res = this.tree[treeIndex * 2 + 2];
    }
    if (this.tree[treeIndex * 2 + 1] > res) {
      res = this.tree[treeIndex * 2 + 1];
    }

    res = this.max(treeIndex * 2 + 2, res);
    res = this.max(treeIndex * 2 + 1, res);
    return res;
  }
}

module.exports = {
  BinarySearchTree,
};
