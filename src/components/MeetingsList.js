import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "../Firebase";
import { GoTrashcan } from "react-icons/go";
import { FaLink } from "react-icons/fa";

const MeetingsList = ({ meetings, userId }) => {
  const deleteMeeting = (e, id) => {
    e.preventDefault();
    const ref = firebase.database().ref(`meetings/${userId}/${id}`);
    ref.remove();
  };
  const list = meetings.map(meeting => {
    return (
      <div className="list-group-item d-flex" key={meeting.meetingID}>
        <section
          className="btn-group align-self-center"
          role="group"
          aria-label="Meeting Options"
        >
          <button
            className="btn btn-sm btn-outline-secondary"
            title="Delete Meeting"
            onClick={e => deleteMeeting(e, meeting.meetingID)}
          >
            <GoTrashcan />
          </button>
          <NavLink
            to={`/checkin/${userId}/${meeting.meetingID}`}
            className="btn btn-sm btn-outline-secondary"
            title="Check In"
          >
            <FaLink />
          </NavLink>
        </section>
        <section className="pl-3 text-left align-self-center">
          {meeting.meetingName}
        </section>
      </div>
    );
  });
  return (
    <div className="row justify-content-center">
      <div className="col-12 text-center">
        <h4 className="card-title font-weight-light mb-4 mt-5">
          Your Meetings
        </h4>
      </div>
      {meetings.length ? (
        <div className="col-8 text-center">
          <div className="card border-1 rounded-0">
            <div className="card-body py-2">
              <div className="list-group list-group-flush">{list}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>You have no meetings.</p>
      )}
    </div>
  );
};

export default MeetingsList;
