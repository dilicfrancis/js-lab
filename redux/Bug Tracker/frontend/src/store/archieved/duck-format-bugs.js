//Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

//Action Creators
export const bugAdded = (description, id) => ({
  type: BUG_ADDED,
  payload: { description, id },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: { id },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: { id },
});

//Reducer
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
