import { combineReducers } from "@reduxjs/toolkit";
import TokenReducer from "./token";

const rootReducer = combineReducers({
	token: TokenReducer,
});

export default rootReducer;
