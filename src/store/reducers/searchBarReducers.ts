import { createSlice } from "@reduxjs/toolkit";
import { clearSearchBar, searchBar } from "../actions";

interface SearchBarState {
  query: string;
}

const initialState: SearchBarState = {
  query: "",
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(searchBar.fulfilled, (state, action) => {
      state.query = action.payload;
    })
    .addCase(clearSearchBar.fulfilled, (state, action) => {
      state.query = action.payload;
    });
  },
});

export default searchBarSlice.reducer;
