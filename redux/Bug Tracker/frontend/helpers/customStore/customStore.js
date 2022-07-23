import reducer from "../../src/reducer";

function createStore(reducer) {
  let state;
  let subscriptions = [];

  function subscribe(echo) {
    subscriptions.push(echo);
    return function unsubscribe() {
      subscriptions = [];
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < subscriptions.length; i++) {
      //fetch every subscription function in the array and ...
      subscriptions[i](); //... run each of them
    }
  }
  function getState() {
    return state;
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore(reducer);
