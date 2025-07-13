import React from "react";
import { NavLink } from "react-router";
import logo from '../assets/logo.png';
import ProfileIcon from "./ProfileIcon";

function Header() {

  const navLinkStyle = ({ isActive }) =>
    `relative px-3 py-2 rounded-md transition-all duration-300
    ${
      isActive
        ? 'text-primary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary'
        : 'text-gray-700 dark:text-gray-100 hover:text-primary hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:h-0.5 hover:after:w-full hover:bg-primary'
    }`;

  return (
    <div>
      <div className="navbar z-50 bg-base-100 bg-opacity-50 backdrop-blur-lg shadow-sm px-3 fixed top-0">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-50 mt-1 p-1 shadow bg-base-100 bg-opacity-80 rounded-box w-52 backdrop-blur"
            >
              <li>
                <NavLink to="/" className={navLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className={navLinkStyle}>
                  My Routes
                </NavLink>
              </li>
              <li>
                <NavLink to="/analysis" className={navLinkStyle}>
                  CO₂ Analysis
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost text-2xl font-bold tracking-wide"
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={logo} alt="EcoRoute Logo" />
              </div>
            </div>
            <span>EcoRoute</span>
          </NavLink>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={navLinkStyle}>
                My Routes
              </NavLink>
            </li>
            <li>
              <NavLink to="/analysis" className={navLinkStyle}>
                CO₂ Analysis
              </NavLink>
            </li>
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end gap-4">
          <ProfileIcon/>
        </div>
      </div>
    </div>
  );
}

export default Header;
