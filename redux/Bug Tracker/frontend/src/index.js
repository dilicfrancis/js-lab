import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import { addBug, loadBugs, resolveBug, assignBugToUser } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());
//store.dispatch(addBug({ description: "new bug" }));

//setTimeout(() => store.dispatch(resolveBug(1634593050714)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 5)), 2000);
//setTimeout(() => store.dispatch(loadBugs()), 2000);

// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: actions.bugsReceived.type,
//   })
// );

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     method: "get", //Get is assumed by default
//     data: {}, //can be omitted
//     onSuccess: "bugsReceived",
//     onError: "ApiCallFailed",
//   },
// });
