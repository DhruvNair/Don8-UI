import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
	name: "token",
	initialState: "",
	reducers: {
		setToken: (state, action: PayloadAction<string>) => action.payload,
		clearToken: () => "",
	},
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
