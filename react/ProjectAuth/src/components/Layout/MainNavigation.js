import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const loggedInCtx = useContext(AuthContext);
  const history = useHistory();

  const loggedIn = loggedInCtx.loggedIn;

  const logoutHandler = () => {
    loggedInCtx.logout();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!loggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
