import { Link, useHistory } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = () => {

  const history = useHistory();
  const logoutHandler = () => {
    authContext.logout('');
    history.replace('/auth');
  }
const authContext = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authContext.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authContext.isLoggedIn && (
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
