import * as actions from "./actionTypes";

export const bugAdded = (description, id) => ({
  type: actions.BUG_ADDED,
  payload: { description, id },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: { id },
});
