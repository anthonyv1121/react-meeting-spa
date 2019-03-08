import React from "react";
import PropTypes from "prop-types";

const Welcome = ({ userName }) => {
  return (
    <div className="text-center mt-4">
      <span className="text-secondary font-weight-bold pl-1">
        Welcome {userName}
      </span>
    </div>
  );
};
Welcome.propTypes = {
  userName: PropTypes.string
};
export default Welcome;
