import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from "./actionTypes";

//Using if statements
// function reducer(state = [], action) {
//   if (action.type === "bugAdded") {
//     return [
//       ...state,
//       {
//         id: action.payload.id,
//         description: action.payload.description,
//         resolve: "false",
//       },
//     ];
//   } else if (action.type === "bugRemoved") {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   } else {
//     return state;
//   }
// }

//Using Switch-Cases
function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: action.payload.id,
          description: action.payload.description,
          resolved: "false",
        },
      ];
    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: "true" } : bug
      );
    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;
