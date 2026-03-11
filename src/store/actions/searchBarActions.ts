import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionTypes";

export const searchBar = createAsyncThunk(
  actionTypes.SEARCH_BAR,
  async (query: string, { rejectWithValue }) => {
    try {
      return query;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const clearSearchBar = createAsyncThunk(
  actionTypes.CLEAR_SEARCH_BAR,
  async (_, { rejectWithValue }) => {
    try {
      return "";
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
