import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
// import { ProgressPlugin } from "webpack";
import logo from '../images/logo.svg';


export default function Header({ email }) {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogOut(e) {
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    setLoggedIn(false);
    console.log(loggedIn);
    history.push("/signin");
  }

  return (
    <header className="header header_type_starter-page">
      <img className="header__logo" src={logo} alt="логотип" />
      <Switch>
        <Route path="/signin">
          <div className="header__info">
            <Link className="header__link" to="/signup">Register</Link>
          </div>
        </Route>
        <Route path="/signup">
          <div className="header__info">
            <Link className="header__link" to="/signin">Log in</Link>
          </div>
        </Route>
        <Route path="/">
          <div className="header__info">
            <p className="header__paragraph">{email}</p>
            <Link
              className="header__link"
              to="/signin"
              onClick={handleLogOut}
            >
              Log out
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}





