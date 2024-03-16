import { createContainer } from "react-reconciler/src/ReactFiberReconciler";

export function createRoot(container) {
  const root = createContainer(container);
  return root;
}
