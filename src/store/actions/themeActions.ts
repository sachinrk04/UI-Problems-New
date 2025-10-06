import {createAsyncThunk} from "@reduxjs/toolkit";
import * as actionTypes from "../actionTypes";

export const themeChange = createAsyncThunk(actionTypes.SET_THEME, async (payload: string) => {
    return payload;
});
