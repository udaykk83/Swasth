import { createSlice } from "@reduxjs/toolkit";
// to the store the state of the user record
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});
//exporting the slices created
export const { setUser, reloadUserData } = userSlice.actions;