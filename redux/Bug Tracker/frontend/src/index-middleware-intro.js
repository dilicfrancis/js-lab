import configureStore from "./store/configureStore";

const store = configureStore();

//middleware allows us call functions within dispatched
store.dispatch((dispatch, getState) => {
  //functions called without a middleware produces an error
  //E.g
  //Call and API
  //When the promise is resolved, then dispatch
  dispatch({
    type: "bugReceived",
    /*some value from the server*/ bugs: [1, 2, 3],
  });
  //console.log(getState());

  //If th promise is rejected, then dispatch something else
});

store.dispatch({
  type: "error",
  payload: { message: "An error has occurred." },
});
