import * as React from "react";
import * as ReactDOM from "react-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<div>react debug</div>);

let element = (
  <div key="title" id="title">
    title
  </div>
);
ReactDOM.render(element, document.getElementById("root"));
