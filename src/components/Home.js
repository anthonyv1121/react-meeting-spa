import React from "react";
import PropTypes from "prop-types";
import Welcome from "./Welcome";

const Home = ({ auth }) => {
  const { status, userName } = auth;
  console.log(auth);
  return (
    <>
      {status && userName && <Welcome userName={userName} />}
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div className="display-4 text-primary mt-3 mb-2">Meeting Log</div>
            <p className="lead">
              This simple app creates meetings, allows people to check in, and
              picks random auths to award giveaways. It's a good example of a
              Single Page Application which includes connection to a database
              and routing. It's a practical way to learn{" "}
              <a href="https://reactjs.org/">React</a>
              with <a href="https://firebase.google.com">Firebase</a>.
            </p>

            {status ? (
              <a href="/meetings" className="btn btn-primary">
                My Meetings
              </a>
            ) : (
              <>
                <a href="/register" className="btn btn-outline-primary mr-2">
                  Register
                </a>
                <a href="/login" className="btn btn-outline-primary mr-2">
                  Log In
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
Home.propTypes = {
  auth: PropTypes.object
};

export default Home;
