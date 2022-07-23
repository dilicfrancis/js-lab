import React, { useState, useEffect, useCallback } from "react";

let clearDuration;

const AuthContext = React.createContext({
  token: "",
  loggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calcExpiration = (expiration) => {
  const timeStamp = new Date().getTime();
  const newExpiration = new Date(expiration).getTime();
  const duration = newExpiration - timeStamp;

  return duration;
};

const retrieveToken = () => {
  const localToken = localStorage.getItem("token");
  const localDuration = localStorage.getItem("expiration");

  const durationLeft = calcExpiration(localDuration);

  if (durationLeft <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return null;
  }

  return { token: localToken, durationLeft };
};

export const AuthContextProvider = (props) => {
  const initials = retrieveToken();
  let initToken;
  if (initials) {
    initToken = initials.token;
  }
  const [token, setToken] = useState(initToken);

  const loggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    if (clearDuration) {
      clearTimeout(clearDuration);
    }
  }, []);

  const loginHandler = (token, expiration) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiration);

    const newDuration = calcExpiration(expiration);

    clearDuration = setTimeout(logoutHandler, newDuration);
  };

  useEffect(() => {
    if (initials) {
      console.log(initials.durationLeft);
      clearDuration = setTimeout(logoutHandler, initials.durationLeft);
    }
  }, [initials, logoutHandler]);

  const contextData = {
    token,
    loggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
