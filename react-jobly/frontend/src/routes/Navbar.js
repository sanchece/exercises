import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserData from "../UserDataContext";
const Navbar = ({ logOut }) => {
  const { user } = useContext(UserData);
  // console.log("user in navbar context--->", user);
  const loggedIn = () => {
    return (
      <ul>
        <li>
          <NavLink to="/companies">Companies</NavLink>
        </li>
        <li>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <Link to="/" onClick={logOut}>
            Log out
          </Link>
        </li>
      </ul>
    );
  };

  const loggedOut = () => {
    return (
      <ul>
        <li>
          <NavLink to="/companies">Companies</NavLink>
        </li>
        <li>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>

        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      {user ? loggedIn() : loggedOut()}
    </div>
  );
};

export default Navbar;
