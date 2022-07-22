import { combineReducers } from "@reduxjs/toolkit";
import TabBarVisibilityReducer from "./tabBar";

const appReducer = combineReducers({
	tabBarVisible: TabBarVisibilityReducer,
});

export default appReducer;
