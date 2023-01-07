import { createSlice } from "@reduxjs/toolkit";

//reducer used for showloading and hideloading
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

//exporting the slices created
export const { showLoading, hideLoading } = alertsSlice.actions;