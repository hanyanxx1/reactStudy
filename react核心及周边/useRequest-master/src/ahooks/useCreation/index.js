import { useRef } from "react";
import depsAreSame from "../utils/depsAreSame";
export default function useCreation(factory, deps) {
  const { current } = useRef({
    deps,
    obj: undefined,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}
