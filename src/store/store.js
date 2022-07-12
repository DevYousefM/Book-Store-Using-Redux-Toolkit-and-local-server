import { configureStore } from "@reduxjs/toolkit";
import books from "./BookSlice";
import auth from "./authSlice";
const store = configureStore({
  reducer: {
    books,
    auth,
  },
});

export default store;
