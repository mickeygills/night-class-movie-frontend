import React from "react";
import { NavLink } from "react-router-dom";

import "./Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-link">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/sign-up"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        >
          login
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
