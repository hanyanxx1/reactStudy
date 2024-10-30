const RawReactionsMap = new Map();
let currentReaction;

export function observable(value) {
  return new Proxy(value, baseHandlers);
}

const baseHandlers = {
  get(target, key) {
    const result = target[key];
    if (currentReaction) {
      addRawReactionsMap(target, key, currentReaction);
    }
    return result;
  },
  set(target, key, value) {
    target[key] = value;
    RawReactionsMap.get(target)
      ?.get(key)
      ?.forEach((reaction) => reaction());
    return true;
  },
};

const addRawReactionsMap = (target, key, reaction) => {
  const reactionsMap = RawReactionsMap.get(target);
  if (reactionsMap) {
    const reactions = reactionsMap.get(key);
    if (reactions) {
      reactions.push(reaction);
    } else {
      reactionsMap.set(key, [reaction]);
    }
    return reactionsMap;
  } else {
    const reactionsMap = new Map();
    reactionsMap.set(key, [reaction]);
    RawReactionsMap.set(target, reactionsMap);
    return reactionsMap;
  }
};

export const autorun = (tracker) => {
  function reaction() {
    currentReaction = reaction;
    tracker();
    currentReaction = null;
  }
  reaction();
};
