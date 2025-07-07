import { createSlice } from "@reduxjs/toolkit";
// app slice for loading state and user authentication flag
const initialState = {
  isLoading: false,
  message: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});
export const { appLoading, setMessage } = appSlice.actions;

export default appSlice.reducer;
