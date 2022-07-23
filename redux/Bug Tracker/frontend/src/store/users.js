import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    //actions => action handlers
    userAdded: (userState, action) => {
      userState.push({
        id: action.payload.id,
        username: action.payload.username,
      });
    },
  },
});

export const { userAdded, bugAssignment } = userSlice.actions;
export default userSlice.reducer;
