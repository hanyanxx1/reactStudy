import React from "./react";
import ReactDOM from "./react-dom";
const root = document.getElementById("root");

//1. key相同，类型相同，复用老节点，只更新属性
document.querySelector("#single1").addEventListener("click", () => {
  let element = (
    <div key="title" id="title">
      title
    </div>
  );
  ReactDOM.render(element, root);
});

//2.复用老节点，只更新属性
document.querySelector("#single1Update").addEventListener("click", () => {
  let element = (
    <div key="title" id="title2">
      title2
    </div>
  );
  ReactDOM.render(element, root);
});
