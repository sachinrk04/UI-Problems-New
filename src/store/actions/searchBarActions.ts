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
