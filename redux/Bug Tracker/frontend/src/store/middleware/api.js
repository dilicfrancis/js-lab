import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    //next(action);
    const { url, method, data, onSuccess, onError, onRequest } = action.payload;
    try {
      if (onRequest) dispatch({ type: onRequest });
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });
      //General Success
      dispatch(actions.apiCallSucceeded(response.data));
      //if some logic is true, then
      //console.log(onSuccess);
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: {
            description: response.data,
            timestamp: Date.now(),
            id: response.data.id,
            userId: response.data.userId,
          },
        });
      // if (onSuccess)
      //   dispatch({
      //     type: onSuccess,
      //     payload: {
      //       description: response.data,
      //       timestamp: Date.now(),
      //     },
      //   });
    } catch (error) {
      //General error
      dispatch(actions.apiCallFailed(error.message));
      //if some logic is true, then
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
