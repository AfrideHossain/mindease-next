import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "unauthenticated",
};

export const authInfoSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.status = "authenticated";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setUser, clearUser } = authInfoSlice.actions;
export default authInfoSlice.reducer;
