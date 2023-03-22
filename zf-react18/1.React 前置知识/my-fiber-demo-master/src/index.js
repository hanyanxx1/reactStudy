import React from "react";
import ReactDom from "react-dom";

let element = (
  <div id="0">
    <div id="1">1</div>
    <div id="2">2</div>
  </div>
);

ReactDom.render(element, document.getElementById("root"));
