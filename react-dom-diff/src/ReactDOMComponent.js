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
export function diffProperties(domElement, type, lastProps, nextProps) {
  let updatePayload = null;
  let propKey;
  for (propKey in lastProps) {
    if (
      lastProps.hasOwnProperty(propKey) &&
      !nextProps.hasOwnProperty(propKey)
    ) {
      //updatePayload更新数组 [更新的key1,更新的值1,更新的key2,更新的值2]
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string" || typeof nextProp === "number") {
        if (nextProp !== lastProps[propKey]) {
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      }
    } else {
      if (nextProp !== lastProps[propKey]) {
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
  }
  return updatePayload;
}

export function updateProperties(domElement, updatePayload) {
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];
    if (propKey === "children") {
      domElement.textContent = propValue;
    } else {
      domElement.setAttribute(propKey, propValue); //id
    }
  }
}
