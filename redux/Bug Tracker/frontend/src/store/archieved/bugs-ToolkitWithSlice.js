import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

//Using Toolkit Slice pattern
const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    //actions => action handlers
    bugAdded: (bug, action) => {
      bug.push({
        id: action.payload.id,
        description: action.payload.description,
        resolved: "false",
      });
    },
    bugResolved: (bug, action) => {
      const index = bug.findIndex((bug) => bug.id === action.payload.id);
      bug[index].resolved = true;
    },
    bugRemoved: (bug, action) => {
      bug = bug.filter((bug) => bug.id !== action.payload.id);
    },
  },
});
console.log(bugSlice);

export const { bugAdded, bugResolved, bugRemoved } = bugSlice.actions;
export default bugSlice.reducer;

// export default createReducer([], {
//   [bugAdded.type]: (bug, action) => {
//     bug.push({
//       id: action.payload.id,
//       description: action.payload.description,
//       resolved: "false",
//     });
//   },
//   [bugResolved.type]: (bug, action) => {
//     const index = bug.findIndex((bug) => bug.id === action.payload.id);
//     bug[index].resolved = true;
//   },
//   [bugRemoved.type]: (bug, action) => {
//     bug = bug.filter((bug) => bug.id !== action.payload.id);
//   },
// });
