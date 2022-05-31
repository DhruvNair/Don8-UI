import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./demo/counter";
import nameReducer from "./demo/name";

const rootReducer = combineReducers({
	counter: counterReducer,
	name: nameReducer,
});

export default rootReducer;
