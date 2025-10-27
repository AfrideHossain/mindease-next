import { configureStore } from "@reduxjs/toolkit";
import authInfoReducer from "../features/userSession/authInfoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authInfo: authInfoReducer,
    },
  });
};
