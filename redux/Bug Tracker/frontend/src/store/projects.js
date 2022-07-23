import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    //actions => action handlers
    projectAdded: (projectState, action) => {
      projectState.push({
        id: action.payload.id,
        description: action.payload.title,
      });
    },
  },
});

export const { projectAdded } = projectSlice.actions;
export default projectSlice.reducer;
