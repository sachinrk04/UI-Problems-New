import { createAsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionTypes";

export const openCommonModal = createAsyncThunk(
  actionTypes.MODAL_ACTION,
  async (_, { rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);