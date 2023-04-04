import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { combineReducers } from "redux";
import { Reducer } from "../state/userSlice";
import { rootEpic } from "../state";

const rootReducer = combineReducers({
  users: Reducer,
});
const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
