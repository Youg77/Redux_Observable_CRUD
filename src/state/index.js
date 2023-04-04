import { combineEpics } from "redux-observable";

import { fetchDataEpic, delEpic, putEpic, postEpic } from "./epics";

export const rootEpic = combineEpics(fetchDataEpic, putEpic, postEpic, delEpic);
