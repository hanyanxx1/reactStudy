import { createElement, render } from "./micro-react";

const element = createElement(
  "h1",
  { id: "title", class: "hello" },
  "Hello world",
  createElement("h2")
);

render(element, document.getElementById("root"));
