import store from "./customStore";
import * as action from "../../src/actionCreators";
//store.state = "hello";

const unsubscribe = store.subscribe(() =>
  console.log("new state", store.getState())
);
//store.getState();
console.log(store);
console.log(store.getState());
store.dispatch(action.bugAdded("New Bug"));
unsubscribe();
store.dispatch(action.bugAdded("New Bug"));
console.log(store.getState());
