import {combineReducers, configureStore} from "@reduxjs/toolkit";
import starredSlice from "./starredSlice";
import watchLaterSlice from "./watchLaterSlice";
import { middlewares, rtkQueryErrorLogger, reducers } from "./queryServices";

const store = configureStore({
  reducer: combineReducers({
      ...reducers,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(rtkQueryErrorLogger)
      .concat(middlewares);
  },
});

export default store
