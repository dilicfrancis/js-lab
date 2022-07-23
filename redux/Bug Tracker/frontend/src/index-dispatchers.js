import configureStore from "./store/configureStore";
import { userAdded } from "./store/users";
import * as projectActions from "./store/projects";
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  selectUnresolvedBugs,
  selectBugsAssignment,
} from "./store/bugs";

const store = configureStore();

// const unsubscribe = store.subscribe(() =>
//   console.log("new state", store.getState())
// );

store.dispatch(bugAdded({ description: "Bug 1", id: 1, userID: 99 }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugAdded({ description: "Bug 2", id: 2, userID: 98 }));
store.dispatch(bugAdded({ description: "Bug 3", id: 3, userID: 97 }));
store.dispatch(bugResolved({ id: 2 }));
store.dispatch(bugRemoved({ id: 2 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 5, userID: 99 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 6, userID: 97 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 7, userID: 98 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 8, userID: 99 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 9, userID: 98 }));
store.dispatch(bugAdded({ description: "reduxBug", id: 10, userID: 99 }));
//console.log(store.getState());

store.dispatch(projectActions.projectAdded({ id: 1, title: "Project  1" }));
// console.log(
//   store.getState().entitiesReducer.bugs.filter((bug) => !bug.resolved)
// );
console.log(selectUnresolvedBugs(store.getState()));

store.dispatch(userAdded({ id: 99, username: "Lily" }));
store.dispatch(userAdded({ id: 98, username: "Lulu" }));
store.dispatch(userAdded({ id: 97, username: "Lila" }));

console.log(selectBugsAssignment(99)(store.getState()));
console.log(store.getState());
