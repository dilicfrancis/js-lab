//Store is an object
//A reducer function takes a current instance and returns an updated instance in an immutable way
//Action is also an object. It describes changes the Reducer should consider
//Slices refer to each key-value item in the store object. Each Reducer is responsible for one key-value pair / slice

//So, Store are the objects that keep record of the app state. Actions are similar to Events in JS, and Reducers are the Event Handlers that at on the Store in an immutable way to return the updated instance

import store from "./store";
console.log(store);
//use the store methods to access the store
import * as actions from "./actionTypes";
import * as actionCreators from "./actionCreators";

const unsubscribe = store.subscribe(
  //subscribe returns an unsubscribe function.
  () => console.log("new state", store.getState())
); //placed atop other store methods?

//dispatch method calls reducer and passed the current store state and action to it: reducer(state, action)
//it the notifies any subscribers
store.dispatch({
  type: actions.BUG_ADDED,
  payload: { description: "reduxBug", id: 1 },
});

//unsubscribe();

store.dispatch(actionCreators.bugResolved(1));
store.dispatch(actionCreators.bugAdded("Bug 2", 2));
store.dispatch(actionCreators.bugAdded("Bug 3", 3));
store.dispatch(actionCreators.bugResolved(2));

store.dispatch({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1,
  },
});

store.dispatch(actionCreators.bugAdded("reduxBug", 5));

//store.getState() method returns the current state of the store, whether or not you are subscribed to the store. Think of it as a manual fetch whereas subscribe is a automatic fetch whenever the store changes.

console.log(store.getState());
