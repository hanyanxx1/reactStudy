import React from "react";
import { useReducer } from "react";
import { Tracker } from "../reactive";

export const Observer = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const trackerRef = React.useRef(null);
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(forceUpdate);
  }
  return trackerRef.current.track(props.children);
};
