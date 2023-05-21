import { combineReducers } from "@reduxjs/toolkit";
import ThemeSlice from "./theme";
import BibleSlice from "./bible";

const combinedReducers = combineReducers({
    theme: ThemeSlice,
    bible: BibleSlice,
});

export default combinedReducers;
export type State = ReturnType<typeof combinedReducers>;
