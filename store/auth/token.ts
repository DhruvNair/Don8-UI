import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteValueFromSecureStorage } from "../../helpers/secureStorageHelpers";

const tokenSlice = createSlice({
	name: "token",
	initialState: "",
	reducers: {
		setToken: (state, action: PayloadAction<string>) => action.payload,
		clearToken: () => {
			deleteValueFromSecureStorage("token");
			return "";
		},
	},
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
