import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const TabBarVisibilitySlice = createSlice({
	name: "tabBar",
	initialState: true,
	reducers: {
		setTabBarVisible: (state, action: PayloadAction<boolean>) =>
			action.payload,
	},
});

export const { setTabBarVisible } = TabBarVisibilitySlice.actions;
export default TabBarVisibilitySlice.reducer;
