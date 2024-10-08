import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from "./redux";

let counterValue = document.getElementById("counter-value");
let addBtn = document.getElementById("add-btn");
let minusBtn = document.getElementById("minus-btn");

const ADD = "ADD";
const MINUS = "MINUS";
let initState = { number: 0 };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
    case MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
};

let store = createStore(reducer);
function render() {
  counterValue.innerText = store.getState().number + "";
}

store.subscribe(render);
render();
addBtn.addEventListener("click", () => {
  store.dispatch({ type: ADD });
});
minusBtn.addEventListener("click", () => {
  store.dispatch({ type: MINUS });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
