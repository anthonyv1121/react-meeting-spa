import React, { Component } from "react";
import firebase from "../Firebase";
import AttendeeItem from "./AttendeeItem";
import { withRouter } from "react-router-dom";
import { FaUndo, FaRandom } from "react-icons/fa";

class Attendees extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      attendeesList: [],
      searchQuery: ""
    };
  }
  getFBRef = path => {
    path = typeof path === "string" ? `/${path}` : "";
    const ref = firebase
      .database()
      .ref(`meetings/${this.userId}/${this.meetingId}/attendees${path}`);
    return ref;
  };
  componentDidMount() {
    this._isMounted = true;
    this.userId = this.props.match.params.userId;
    this.meetingId = this.props.match.params.meetingId;
    const ref = this.getFBRef();

    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList;
      if (attendees !== null) {
        attendeesList = Object.keys(attendees).map(item => ({
          ...attendees[item],
          attendeeId: item,
          canDelete: this.props.adminUser === this.userId ? true : false
        }));
      } else {
        attendeesList = [];
      }

      if (this._isMounted) {
        this.setState({ attendeesList });
      }
    });
  }
  onAttendeeDelete = attendee => this.getFBRef(attendee).remove();

  onAttendeeStarred = (attendee, star) => {
    const ref = this.getFBRef(`${attendee}/star`);
    star === undefined ? ref.set(true) : ref.set(!star);
  };

  pickRandom = () => {
    let { attendeesList, searchQuery } = this.state;
    const rIndex = Math.floor(Math.random() * attendeesList.length);
    searchQuery = attendeesList[rIndex].attendeeName;
    this.setState({ searchQuery });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetQuery = e => this.setState({ searchQuery: "" });

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { attendeesList, searchQuery } = this.state;
    const filteredList = attendeesList.filter(item =>
      item.attendeeName.toLowerCase().match(searchQuery.toLowerCase())
    );
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    className="form-control"
                    placeholder="Search Attendees"
                    value={this.state.searchQuery}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Pick a random attendee"
                      onClick={this.pickRandom}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Reset Search"
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {attendeesList.length === 0 && this._isMounted ? (
            <p>No attendees for this meeting...</p>
          ) : filteredList.length === 0 && this._isMounted ? (
            <p>No attendees match this search query...</p>
          ) : (
            filteredList.map(ai => (
              <AttendeeItem
                key={ai.attendeeId}
                {...ai}
                onAttendeeDelete={this.onAttendeeDelete}
                onAttendeeStarred={this.onAttendeeStarred}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Attendees);
