import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
	name: "userDetails",
	initialState: {
		id: "",
		displayName: "",
		email: "",
		mobile: "",
		profileImageURL: "",
	},
	reducers: {
		setUserDetails: (
			state,
			action: PayloadAction<{
				id: string;
				displayName: string;
				email: string;
				mobile: string;
				profileImageURL: string;
			}>
		) => action.payload,
	},
});

export const { setUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
