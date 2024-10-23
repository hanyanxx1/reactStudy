let EventEmitter = require("events");
let e = new EventEmitter();
e.once("click", (data) => {
  console.log("click", data);
});
e.emit("click", "hello");
e.emit("click", "hello");
