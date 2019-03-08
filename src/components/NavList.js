import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ children, ...props }) => (
  <NavLink exact className="nav-item nav-link" {...props}>
    {children}
  </NavLink>
);

const NavList = (NavItemComponent, links, logout) => {
  return class extends Component {
    render() {
      return (
        <div className="navbar-nav ml-auto">
          {links.map(l => (
            <NavItemComponent
              className="nav-item nav-link"
              to={`/${l.url}`}
              key={l.id}
              onClick={l.url === "logout" ? e => logout(e) : null}
            >
              {l.name}
            </NavItemComponent>
          ))}
        </div>
      );
    }
  };
};
// const props = { to: "/register" };

// const NavList = ({ links }) => {
//   const ListComposed = HighOrderNavList(NavLink, links);

//   return (
//     <div className="navbar-nav ml-auto">
//       {links.map(l => (
//         <NavItem to={`/${l.url}`} key={l.id}>
//           {l.name}
//         </NavItem>
//       ))}
//       <ListComposed />
//     </div>
//   );
// };

NavList.propTypes = {
  NavItemComponent: PropTypes.func,
  links: PropTypes.array,
  logout: PropTypes.func
};
NavItem.propTypes = {
  children: PropTypes.node
};

export default NavList;
