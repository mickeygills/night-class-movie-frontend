import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

function Header({ user, logout }) {
  return (
    <div className="header-container">
      <div className="header-container-title">
        <h1>Welcome to Noble Movie App</h1>
      </div>

      <div className="header-link">
        {user ? (
          <>
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Movie
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Welcome, {user.username}
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
              onClick={logout}
            >
              logout
            </NavLink>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
