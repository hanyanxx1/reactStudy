function DoublyLinkedList() {
  function Node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  this.head = null;
  this.tail = null;
  this.length = 0;

  DoublyLinkedList.prototype.append = function (data) {
    var newNode = new Node(data);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  };

  DoublyLinkedList.prototype.toString = function () {
    return this.backwardString();
  };

  DoublyLinkedList.prototype.forwardString = function () {
    var current = this.tail;
    var resultString = "";

    while (current) {
      resultString += current.data + "=>";
      current = current.prev;
    }

    return resultString;
  };

  DoublyLinkedList.prototype.backwardString = function () {
    var current = this.head;
    var resultString = "";

    while (current) {
      resultString += current.data + "=>";
      current = current.next;
    }

    return resultString;
  };

  DoublyLinkedList.prototype.insert = function (position, data) {
    if (position < 0 || position > this.length) return false;

    var newNode = new Node(data);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (position === 0) {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      } else if (position === this.length) {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      } else {
        var current = this.head;
        var index = 0;

        while (index++ < position) {
          current = current.next;
        }

        newNode.next = current;
        newNode.prev = current.prev;
        current.prev.next = newNode;
        current.prev = newNode;
      }
    }

    this.length++;

    return true;
  };

  DoublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null;

    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }

    return current.data;
  };

  DoublyLinkedList.prototype.indexOf = function (data) {
    var current = this.head;
    var index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  };

  DoublyLinkedList.prototype.update = function (position, data) {
    if (position < 0 || position > this.length) return false;

    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data = data;
    return true;
  };

  DoublyLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return false;
    var current = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (position === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else if (position === this.length - 1) {
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        var index = 0;
        while (index++ < position) {
          current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }

    this.length--;

    return current.data;
  };

  DoublyLinkedList.prototype.remove = function (data) {
    var index = this.indexOf(data);
    if (index === -1) return false;

    this.removeAt(index);
    return true;
  };

  DoublyLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  DoublyLinkedList.prototype.Size = function () {
    return this.length;
  };

  DoublyLinkedList.prototype.getHead = function () {
    return this.head;
  };

  DoublyLinkedList.prototype.getTail = function () {
    return this.tail;
  };
}

var doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append("aaa");
doublyLinkedList.append("bbb");
doublyLinkedList.append("ccc");
console.log(doublyLinkedList.backwardString());
console.log(doublyLinkedList.forwardString());
console.log(doublyLinkedList.toString());
doublyLinkedList.insert(1, "111");
doublyLinkedList.insert(3, "222");
console.log(doublyLinkedList.toString());

console.log(doublyLinkedList.get(1));
console.log(doublyLinkedList.indexOf("222"));

doublyLinkedList.update(0, "eee");
console.log(doublyLinkedList.toString());

console.log(doublyLinkedList.removeAt(1));
console.log(doublyLinkedList.toString());

console.log(doublyLinkedList.remove("bbb"));
console.log(doublyLinkedList.toString());

console.log(doublyLinkedList.length);
console.log(doublyLinkedList.Size());
console.log(doublyLinkedList.getHead());
console.log(doublyLinkedList.getTail());
