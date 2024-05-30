
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./reducers/auth/authSlice";
import todoReducer from "./reducers/todos/todoSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      todo: todoReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
