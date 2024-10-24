import EventEmitter from "events";
import runSaga from "./runSaga";

export default function createSagaMiddleware() {
  let channel = new EventEmitter();
  let boundRunSaga;
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { channel, dispatch, getState });
    return function (next) {
      return function (action) {
        const result = next(action);
        channel.emit(action.type, action);
        return result;
      };
    };
  }
  sagaMiddleware.run = (saga) => boundRunSaga(saga);
  return sagaMiddleware;
}
