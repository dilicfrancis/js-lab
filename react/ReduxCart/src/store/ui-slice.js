import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartVisible: false, prompt: null },
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
    notify(state, action) {
      state.prompt = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
