import React, { Component } from "react";
import PropTypes from "prop-types";
import Brand from "./Brand";
import NavList from "./NavList";

const Header = NavComponent => {
  return class extends Component {
    render() {
      return (
        <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
          <div className="container-fluid">
            <Brand />
            {/* <NavList links={links.filter(link => link.type === type)} /> */}
            <NavComponent />
          </div>
        </nav>
      );
    }
  };
};

export default Header;

Header.propTypes = {
  NavComponent: PropTypes.instanceOf(NavList)
};
