import React from "react";
import ReactDOM from "react-dom/client";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";
import store from "./store";
import Provider from "./react-redux/Provider";
import Counter3 from "./components/Counter3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
    <Counter3 />
  </Provider>
);
