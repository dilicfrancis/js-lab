import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuth: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

// const counterReducer = (state = initialState, action) => {
//   // if (action.type === "increment") {
//   //   return { counter: state.counter + 1 };
//   // }
//   // if (action.type === "decrement") {
//   //   return { counter: state.counter - 1 };
//   // }
//   // if (action.type === "multiIncrement") {
//   //   return { counter: state.counter + action.value };
//   // }
//   // if (action.type === "toggle") {
//   //   return { counter: state.counter, showCounter: !state.showCounter };
//   // }
//   // return state;

//   switch (action.type) {
//     case "increment":
//       return { ...state, counter: state.counter + 1 };
//     case "decrement":
//       return { ...state, counter: state.counter - 1 };
//     case "multiIncrement":
//       return {
//         ...state,
//         counter: state.counter + action.value,
//       };
//     case "toggle":
//       return { ...state, showCounter: !state.showCounter };
//     default:
//       return state;
//   }
// };
