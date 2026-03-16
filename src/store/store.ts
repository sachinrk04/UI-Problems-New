import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import themeReducer from "./reducers/themeReducers";
import searchBarReducer from "./reducers/searchBarReducers";
import commonReducers from "./reducers/commonReducers";

export const store = configureStore({
  reducer: {
    themes: themeReducer,
    searchQuery: searchBarReducer,
    commonState: commonReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
