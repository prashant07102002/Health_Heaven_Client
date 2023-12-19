import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    }
  },
});

export const { setLogin, setLogout, showToast } = authSlice.actions;
export default authSlice.reducer;