import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import CheckIn from "./components/CheckIn";
import Attendees from "./components/Attendees";

export const routes = (state, events) => {
  return class RoutesList extends Component {
    render() {
      return (
        <Switch>
          <Route
            exact
            path="/meetings"
            component={() => (
              <Meetings
                onMeetingAdded={events.onMeetingAdded}
                userId={state.auth.userId}
                meetings={state.meetings}
              />
            )}
          />
          <Route
            exact
            path="/register"
            component={() => (
              <Register onUserRegistered={events.onUserRegistered} />
            )}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:id" component={Login} />
          <Route exact path="/" component={() => <Home auth={state.auth} />} />
          <Route exact path="/checkin/:userId/:meetingId" component={CheckIn} />
          <Route
            exact
            path="/attendees/:userId/:meetingId"
            component={() => <Attendees adminUser={state.auth.userId} />}
          />
          <Route component={PageNotFound} />
          <Redirect from="/home" to="/" />
        </Switch>
      );
    }
  };
};

// Reach Router
/* <Router>
  <Home path="/" auth={auth} />
  <Meetings path="/meetings" />
  <Register path="/register" />
  <Login path="/login" />
</Router>; */
