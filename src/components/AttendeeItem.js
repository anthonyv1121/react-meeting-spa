import React from "react";
import { GoTrashcan, GoStar, GoMail } from "react-icons/go";

const AttendeeItem = ({ ...props }) => {
  const {
    attendeeId,
    canDelete,
    attendeeEmail,
    attendeeName,
    star,
    onAttendeeDelete,
    onAttendeeStarred
  } = props;
  return (
    <div className="col-8 col-sm-6 mb-2 p-0 px-1">
      <div className="card ">
        <div
          className={
            "card-body px-3 py-2 d-flex align-items-center " +
            (canDelete ? "" : "justify-content-center")
          }
        >
          {canDelete && (
            <div className="btn-group pr-2">
              <button
                className={
                  "btn btn-sm " + (star ? "btn-info" : "btn-outline-secondary")
                }
                tite="Give user a star"
                onClick={e => onAttendeeStarred(attendeeId, star)}
              >
                <GoStar />
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                tite="Delete Attendee"
                onClick={e => onAttendeeDelete(attendeeId)}
              >
                <GoTrashcan />
              </button>
              <a
                className="btn btn-sm btn-outline-secondary"
                title="Mail Attendee"
                href={"mailto:" + attendeeEmail}
              >
                <GoMail />
              </a>
            </div>
          )}
          <div>{attendeeName}</div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeItem;
