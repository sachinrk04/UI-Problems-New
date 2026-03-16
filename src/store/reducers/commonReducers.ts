import { createSlice } from "@reduxjs/toolkit";
import { openCommonModal } from "../actions";

interface CommonState {
  commonModal: boolean;
}

const initialState: CommonState = {
  commonModal: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(openCommonModal.fulfilled, (state) => {
      state.commonModal = !state.commonModal;
    });
  },
});

export default commonSlice.reducer;