import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

let middleWare;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleWare = composeEnhancers(applyMiddleware(
  thunk,
  createLogger({
    predicate: () => {
      return true;
    },
  }),
));

// eslint-disable-next-line import/no-anonymous-default-export
export default (initState) => {
  const store = createStore(reducers, initState, middleWare);
  return store;
};
