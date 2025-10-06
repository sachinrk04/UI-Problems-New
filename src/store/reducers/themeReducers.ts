import {createSlice} from "@reduxjs/toolkit";
import type {ThemeState} from "@/types/appStates";
import {themeChange} from "../actions";

const initialState: ThemeState = {
    themeValue: "light",
};

const themeChangeSlice = createSlice({
    name: "themeChange",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(themeChange.fulfilled, (state, action) => {
            state.themeValue = action.payload as ThemeState["themeValue"];
        });
    },
});

export default themeChangeSlice.reducer;
