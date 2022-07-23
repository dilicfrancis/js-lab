const notification =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "error")
      console.log("UI Lib : " + action.payload.message);
    else next(action);
  };

export default notification;
