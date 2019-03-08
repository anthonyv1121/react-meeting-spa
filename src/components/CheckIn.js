import React, { Component, useState } from "react";
import firebase from "../Firebase";
import { NavLink } from "react-router-dom";
const Button = () => {
  const [counter, setCounter] = useState(10);
  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
};

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      meetingName: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${this.userId}/${this.meetingId}/attendees`);

    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email,
      star: false
    });
    this.props.history.push({
      pathname: `/attendees/${this.userId}/${this.meetingId}` // redirect after submisson complete
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.userId = this.props.match.params.userId;
    this.meetingId = this.props.match.params.meetingId;

    const ref = firebase
      .database()
      .ref(`meetings/${this.userId}/${this.meetingId}`);

    ref.on("value", snapshot => {
      let meeting = snapshot.val();
      if (this._isMounted) {
        this.setState({ meetingName: meeting.meetingName });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">
                    Check in: {this.state.meetingName}
                  </h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Name"
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Check in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <NavLink
                exact
                className="nav-item nav-link mt-3"
                to={`/attendees/${this.userId}/${this.meetingId}`}
              >
                View attendees list for this event.
              </NavLink>
              <Button />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CheckIn;
