export function createElement(type) {
  return document.createElement(type);
}
export function setInitialProperties(domElement, tag, props) {
  for (const propKey in props) {
    const nextProp = props[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string" || typeof nextProp === "number") {
        domElement.textContent = nextProp;
      }
    } else if (propKey === "style") {
      for (let stylePropKey in nextProp) {
        domElement.style[stylePropKey] = nextProp[stylePropKey];
      }
    } else {
      domElement[propKey] = nextProp;
    }
  }
}
