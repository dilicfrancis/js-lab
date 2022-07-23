const logger = (param) => (store) => (next) => (action) => {
  // console.log("param", param);
  // console.log("store", store);
  // console.log("next", next);
  // console.log("action", action);

  //the next(action) method passes the action to the next middleware. a dispatch() will re-dispatch the action - essentially passing it through all the middleware again.
  next(action);
};

export default logger;
