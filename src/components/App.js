import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import AuthService from "../services/auth.service";

import Login from "./Login";
import Dashboard from "./Dashboard";
import UserHome from "./UserHome";
import Registration from "./Registration";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const App = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const validateCurrentUser = async () => {
    const user = await AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  };

  useEffect(() => {
    validateCurrentUser();
  }, []);

  return (
    <Router>
      {!loading ? (
        <Switch>
          <Route exact path="/login">
            <Login validateCurrentUser={validateCurrentUser} />
          </Route>
          <Route exact path="/registration/:formId">
            <Registration />
          </Route>
          {currentUser ? (
            <React.Fragment>
              <Route exact path="/">
                <div className={classes.root}>
                  <CssBaseline />
                  <Dashboard currentUser={currentUser} />
                  <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <UserHome />
                  </main>
                </div>
              </Route>
              <Route path="*">404</Route>
            </React.Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      ) : (
        <div>Loading...</div>
      )}
    </Router>
  );
};

export default App;
