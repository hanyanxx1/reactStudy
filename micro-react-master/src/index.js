import { createElement, render } from "./micro-react";

// const element = createElement(
//   "h1",
//   { id: "title", class: "hello" },
//   "Hello world",
//   createElement("h2")
// );

const element = createElement(
  "div",
  { id: "top" },
  createElement(
    "div",
    { id: "divA" },
    createElement("span", { id: "spanA1" }, "A1"),
    createElement("span", { id: "spanA2" }, "A2")
  ),
  createElement(
    "div",
    { id: "divB" },
    createElement("span", { id: "spanB1" }, "B1"),
    createElement("span", { id: "spanB2" }, "B2")
  )
);

render(element, document.getElementById("root"));
