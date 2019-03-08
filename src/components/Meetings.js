import React, { Component } from "react";
import MeetingsList from "./MeetingsList";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: "",
      isValid: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onMeetingAdded(this.state.meetingName);
    this.setState({ meetingName: "" });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, () => this.validate(value));
  };
  validate(value) {
    this.setState({ isValid: value.length > 5 });
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.handleSubmit}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="meetingName"
                      placeholder="Meeting name"
                      aria-describedby="buttonAdd"
                      value={this.state.meetingName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                        disabled={!this.state.isValid}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.props.meetings && this.props.meetings.length ? (
          <MeetingsList
            meetings={this.props.meetings}
            userId={this.props.userId}
          />
        ) : null}
      </div>
    );
  }
}

export default Meetings;
