import { combineReducers } from "@reduxjs/toolkit";
import TokenReducer from "./token";
import UserDetailsReducer from "./userDetails";

const rootReducer = combineReducers({
	token: TokenReducer,
	userDetails: UserDetailsReducer,
});

export default rootReducer;
