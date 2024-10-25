import * as effectTypes from "./effectTypes";
export default function runSaga(env, saga) {
  let { channel, dispatch } = env;
  let it = typeof saga === "function" ? saga() : saga;
  function next(value) {
    let { value: effect, done } = it.next(value);
    if (!done) {
      if (typeof effect[Symbol.iterator] === "function") {
        runSaga(env, effect);
        next(); //不会阻止当前saga继续向后走
      } else if (effect instanceof Promise) {
        effect.then(next);
      } else {
        switch (effect.type) {
          case effectTypes.TAKE:
            channel.once(effect.actionType, next);
            break;
          case effectTypes.PUT:
            dispatch(effect.action);
            next();
            break;
          case effectTypes.FORK:
            runSaga(env, effect.saga);
            break;
          default:
            break;
        }
      }
    }
  }
  next();
}
