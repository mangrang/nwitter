// import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {isLoggedIn ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Switch>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
          </Switch>
        </div>
      ) : (
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
