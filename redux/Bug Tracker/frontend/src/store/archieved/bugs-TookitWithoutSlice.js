import { createAction, createReducer } from "@reduxjs/toolkit";

//console.log(function () {}.constructor == Function);
//createAction() takes an action type as ar" and return its Action Creator function
//Therefore Action Types do not have to be defined separately from Action Creators
// const test = createAction("someAction");
// console.log(test("Hey"));

//Action Creators - Action types are defined in the args
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

//Toolkit Reducer
export default createReducer([], {
  //key:value
  //action: function (similar to event => event handler)
  [bugAdded.type]: (bug, action) => {
    bug.push({
      id: action.payload.id,
      description: action.payload.description,
      resolved: "false",
    });
  },
  [bugResolved.type]: (bug, action) => {
    const index = bug.findIndex((bug) => bug.id === action.payload.id);
    bug[index].resolved = true;
  },
  [bugRemoved.type]: (bug, action) => {
    bug = bug.filter((bug) => bug.id !== action.payload.id);
  },
});

//Reducer - classis
// function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: action.payload.id,
//           description: action.payload.description,
//           resolved: "false",
//         },
//       ];
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id === action.payload.id ? { ...bug, resolved: "true" } : bug
//       );
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     default:
//       return state;
//   }
// }

// export default reducer;
