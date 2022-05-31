import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nameSlice = createSlice({
	name: "name",
	initialState: "",
	reducers: {
		setName: (state, action: PayloadAction<string>) => action.payload,
	},
});

export const { setName } = nameSlice.actions;
export default nameSlice.reducer;
