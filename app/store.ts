import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import appReducer from "@/features/appSlice";
import userReducer from "@/features/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      // Add your reducers here
      app: appReducer,
      login: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
