import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import taskSliceReducer from "./features/taskSlice";

const store = configureStore({
  reducer: {
    task: taskSliceReducer,
  },
  middleware: [reduxThunk],
});

export default store;
