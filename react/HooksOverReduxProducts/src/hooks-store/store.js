import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (Listening = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (Listening) {
      listeners.push(setState);
    }
    return () => {
      if (Listening) {
        listeners = listeners.filter((l) => l !== setState);
      }
    };
  }, [setState, Listening]);

  return [globalState, dispatch];
};

export const baseStore = (action, state) => {
  if (state) {
    globalState = { ...globalState, ...state };
  }

  actions = { ...actions, ...action };
};
