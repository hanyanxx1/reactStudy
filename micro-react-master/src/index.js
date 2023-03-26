import React from "react";
import ReactDOM from "react-dom/client";

import { createElement } from "./micro-react";

const element = createElement(
  "h1",
  { id: "title", class: "hello" },
  "Hello world",
  createElement("h2")
);

console.log(element);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(element);
