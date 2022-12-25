// import { useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  //   const [isLoggedIn, setIsloggedIn] = useState(true);
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {/* <Route /> */}
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </Router>
  );
};

export default AppRouter;