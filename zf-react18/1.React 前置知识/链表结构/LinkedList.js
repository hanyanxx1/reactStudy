//https://xpoet.cn/2020/07/JavaScript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%EF%BC%88%E5%85%AD%EF%BC%89%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/
// 封装链链表
function LinkedList() {
  // 内部的类：节点类
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  //属性
  this.head = null;
  this.length = 0;

  LinkedList.prototype.append = function (data) {
    var newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      var current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  };

  LinkedList.prototype.toString = function () {
    var current = this.head;
    var str = "";
    while (current) {
      str += current.data + "->";
      current = current.next;
    }
    return str;
  };

  LinkedList.prototype.insert = function (position, data) {
    if (position < 0 || position > this.length) return false;

    var newNode = new Node(data);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }

    var index = 0;
    var current = this.head;
    var previous = null;
    while (index++ < position) {
      previous = current;
      current = current.next;
    }

    newNode.next = current;
    previous.next = newNode;

    this.length++;
    return true;
  };

  LinkedList.prototype.get = function (position) {
    if (position < position || position >= this.length) return null;
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  };

  LinkedList.prototype.indexOf = function (data) {
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

  LinkedList.prototype.update = function (position, data) {
    if (position < position || position >= this.length) return null;
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data = data;
    return true;
  };

  LinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position > this.length) return null;
    if (position === 0) {
      this.head = this.head.next;
    } else {
      var index = 0;
      var current = this.head;
      var previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = current.next;

      this.length -= 1;

      return current.data;
    }
  };

  LinkedList.prototype.remove = function (data) {
    var index = this.indexOf(data);
    return this.removeAt(index);
  };

  LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  LinkedList.prototype.size = function () {
    return this.length;
  };
}

var list = new LinkedList();
list.append("abc");
list.append("cba");
list.append("nba");
console.log(list.toString());

console.log(list.insert(1, "ccc"));
console.log(list.toString());

console.log(list.get(1));

console.log(list.indexOf("cba"));

console.log(list.update(2, "222"));

console.log(list.toString());

console.log(list.removeAt(2));

console.log(list.toString());

console.log(list.remove("222"));
