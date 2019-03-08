import React, { Component } from "react";

const Footer = NavComponent => {
  return class extends Component {
    render() {
      return (
        <footer className="footer mt-auto py-3">
          <div className="container">
            <div className="navbar-nav">
              <nav className="navbar navbar-expand">
                <NavComponent />
              </nav>
            </div>
          </div>
        </footer>
      );
    }
  };
};

export default Footer;
