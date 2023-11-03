import React from "react";
import "./Navbar.css";
import inclusify_image from "../images/inclusify.png";
import NavbarDropdown from "react-navbar-dropdown";
import profile_icon from "../images/profile_icon.png";
import search_icon from "../images/search_icon.png";

export default function Navbar() {
  const loggedIn = true;
  return (
    <div className="navbar-whole">
      <div className="navbar-homeLink">
        <img
          className="navbar-homeImage"
          src={inclusify_image}
          alt="Inclusify Logo"
        />
        Inclusify
      </div>
      <div className="navbar-otherLinks">
        <div className="navbar-searchbar">
          <img className="navbar-searchbar-icon" src={search_icon} />
          <input className="navbar-searchbar-input" placeholder="Search Here" />
        </div>
        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={profile_icon}
              alt="Profile Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          {loggedIn ? (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
            >
              <NavbarDropdown.Item className="navbar-dropdown-menu-item">
                Log Out
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          ) : (
            <NavbarDropdown.CSSTransitionMenu>
              <NavbarDropdown.Item className="navbar-dropdown-menu-item">
                Log In
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          )}
        </NavbarDropdown>
      </div>
    </div>
  );
}
