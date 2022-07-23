import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan /*bugsReceived*/ } from "./api";
import moment from "moment";

const bugSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    //actions => action handlers
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload.description;
      bugs.loading = false;
      bugs.lastFetch = action.payload.timestamp;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAdded: (bug, action) => {
      bug.list.push(action.payload);
    },
    // bugAdded: (bug, action) => {
    //   bug.list.push({
    //     id: action.payload.id,
    //     description: action.payload.description,
    //     userId: action.payload.userID,
    //     resolved: false,
    //   });
    // },
    bugResolved: (bug, action) => {
      const index = bug.list.findIndex((bug) => bug.id === action.payload.id);
      bug.list[index].resolved = true;
    },
    // bugResolved: (bug, action) => {
    //   const index = bug.list.findIndex((bug) => bug.id === action.payload.id);
    //   bug.list[index].resolved = true;
    // },
    bugAssignedToUser: (bug, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bug.list.findIndex((bug) => bug.id === bugId);
      bug.list[index].userId = userId;
    },
    bugRemoved: (bug, action) => {
      return bug.list.filter((bug) => bug.id !== action.payload.id); // assignments to state argument e.g bug = [some value or expression], doesn't work.
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
  bugAssignedToUser,
} = bugSlice.actions;
export default bugSlice.reducer;

//Action Creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entitiesReducer.bugs;

  const minuteDiff = moment().diff(moment(lastFetch), "minutes");

  if (minuteDiff < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onRequest: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onRequest: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFailed.type,
//   });
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
