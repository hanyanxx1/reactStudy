import { createStore } from "redux";
const ADD = "ADD";
const MINUS = "MINUS";

function add() {
  return { type: ADD };
}

function minus() {
  return { type: MINUS };
}
function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
    case MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
}

var store = createStore(counter);
var valueEl = document.getElementById("value");

function render() {
  valueEl.innerHTML = store.getState().number;
}

render();
store.subscribe(render);

document.getElementById("add").addEventListener("click", function () {
  store.dispatch(add());
});

document.getElementById("minus").addEventListener("click", function () {
  store.dispatch(minus());
});
