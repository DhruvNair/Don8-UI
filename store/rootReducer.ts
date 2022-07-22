import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import AppReducer from "./app";

const rootReducer = combineReducers({
	auth: AuthReducer,
	app: AppReducer,
});

export default rootReducer;
