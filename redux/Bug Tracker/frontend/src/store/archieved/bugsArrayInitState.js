import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    //actions => action handlers
    bugAdded: (bug, action) => {
      bug.push({
        id: action.payload.id,
        description: action.payload.description,
        userID: action.payload.userID,
        resolved: false,
      });
    },
    bugResolved: (bug, action) => {
      const index = bug.findIndex((bug) => bug.id === action.payload.id);
      bug[index].resolved = true;
    },
    bugRemoved: (bug, action) => {
      return bug.filter((bug) => bug.id !== action.payload.id); // assignments to state argument e.g bug = [some value or expression], doesn't work.
    },
  },
});

export const { bugAdded, bugResolved, bugRemoved } = bugSlice.actions;
export default bugSlice.reducer;

//Selector functions
//Without Memoization
// export const selectUnresolvedBugs = (state) =>
// state.entitiesReducer.bugs.filter((bug) => !bug.resolved);

//With Memoization
//bugs => get unresolved bugs from the cache
export const selectUnresolvedBugs = createSelector(
  (state) => state.entitiesReducer.bugs,
  (state) => state.entitiesReducer.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const selectBugsAssignment = (userID) =>
  createSelector(
    (state) => state.entitiesReducer.bugs,
    (bugs) => bugs.filter((bug) => bug.userID === userID)
  );
