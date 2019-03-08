import React, { Component } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Link } from "@reach/router";
import { routes } from "./routes";
import firebase from "./Firebase";
import { IS_LOGGED_IN, IS_NOT_LOGGED_IN, links } from "./constants";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavList from "./components/NavList";
import Navigate from "./components/Navigate";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { auth: this.resetAuth() };
    this.events = this.eventFactory();
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.events["onUserRegistered"](FBUser);
        this.getUserMeetings(FBUser);
      } else {
        this.setState({ user: null });
      }
    });
  }

  getUserMeetings(FBUser) {
    // console.log("getUserMeetings");
    const meetingsRef = firebase.database().ref("/meetings/" + FBUser.uid);

    meetingsRef.on("value", snapshot => {
      let meetings = snapshot.val();
      let meetingsList = [];

      for (let item in meetings) {
        meetingsList.push({
          meetingID: item,
          meetingName: meetings[item].meetingName
        });
      }
      // console.log({ meetingsRef });
      this.setState({
        meetings: meetingsList,
        howManyMeetings: meetingsList.length
      });
    });
  }
  eventFactory() {
    return {
      onUserRegistered: user => {
        this.setState({
          auth: {
            status: true,
            user: user,
            userName: user.displayName,
            userId: user.uid
          },
          hasLoggedOut: false
        });
      },
      onMeetingAdded: meetingName => {
        const ref = firebase
          .database()
          .ref(`meetings/${this.state.auth.user.uid}`);

        ref.push({ meetingName });
      }
    };
  }

  logOut = e => {
    e.preventDefault();
    this.setState({ auth: this.resetAuth() });

    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ hasLoggedOut: true });
      });
  };

  resetAuth = () => ({
    status: false,
    user: null,
    userName: null,
    userId: null
  });

  onLogoutComplete = () => this.setState({ hasLoggedOut: false });

  render() {
    const auth = this.state.auth;
    const type = auth.status ? IS_LOGGED_IN : IS_NOT_LOGGED_IN;
    const navType = links.filter(link => link.type === type);
    const AppFooter = Footer(NavList(Link, navType));
    const AppHeader = Header(NavList(NavLink, navType, this.logOut));
    const AppRoutes = routes(this.state, this.events);

    return (
      <BrowserRouter>
        <>
          <AppHeader />
          <main role="main" className="flex-shrink-0">
            <div className="container">
              {this.state.hasLoggedOut ? (
                <Navigate to="/login" onComplete={this.onLogoutComplete}>
                  You are being logged out.
                </Navigate>
              ) : null}
              <AppRoutes />
            </div>
          </main>
          <AppFooter />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
