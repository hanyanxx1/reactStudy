import { observable, autorun } from "./@formily/reactive";
const obs = observable({ name: "1" });
const tracker = () => {
  console.log("tracker", obs.name);
};

autorun(tracker);
obs.name = "2";
