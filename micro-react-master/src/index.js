import { createElement, render } from "./micro-react";

// const element = createElement(
//   "div",
//   { id: "top" },
//   createElement(
//     "div",
//     { id: "divA" },
//     createElement("span", { id: "spanA1" }, "A1"),
//     createElement("span", { id: "spanA2" }, "A2")
//   ),
//   createElement(
//     "div",
//     { id: "divB" },
//     createElement("span", { id: "spanB1" }, "B1"),
//     createElement("span", { id: "spanB2" }, "B2")
//   )
// );

const handleChange = (e) => {
  renderer(e.target.value);
};

const container = document.querySelector('#root');

const renderer = (value) => {
  const element = createElement(
    "div",
    null,
    createElement("input", {
      value: value,
      oninput: (e) => {
        handleChange(e);
      },
    }),
    createElement("h2", null, value)
  );
  render(element, container);
};

renderer('Hello');

