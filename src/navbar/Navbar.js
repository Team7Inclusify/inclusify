import React, { useState } from "react";
import "./Navbar.css";
import inclusify_image from "../images/inclusify_no_name.png";
import NavbarDropdown from "react-navbar-dropdown";
import profile_icon from "../images/profile_icon.png";
import more_info_icon from "../images/more_info.png";
import search_icon from "../images/search_icon.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // This to be used later ignore the eslint warning for this for now
  const [isLoggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  function newSearch(event) {
    if (event.key === "Enter") {
      let searched = document
        .getElementById("navBarSearchInput")
        .value.toLowerCase()
        .replace(/ /g, "_");
      console.log("User Searched: " + searched);
      navigate(`/search_results/${searched}`);
    }
  }

  return (
    <div className="navbar-whole">
      <div className="navbar-homeLink" onClick={() => navigate("/")}>
        <img
          className="navbar-homeImage"
          src={inclusify_image}
          alt="Inclusify Logo"
        />
        Inclusify
      </div>
      <div className="navbar-otherLinks">
        <div className="navbar-searchbar">
          <img
            className="navbar-searchbar-icon"
            src={search_icon}
            alt="Search Icon"
          />
          <input
            className="navbar-searchbar-input"
            placeholder="Search Here"
            id="navBarSearchInput"
            onKeyDown={(key) => newSearch(key)}
          />
        </div>
        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={more_info_icon}
              alt="More Info Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          <NavbarDropdown.CSSTransitionMenu
            className="navbar-dropdown-menu"
            classNames="navbar-dropdown-menu"
            timeout={10}
          >
            <NavbarDropdown.Item
              className="navbar-dropdown-menu-item"
              onClick={() => navigate("/tutorials")}
            >
              Tutorials
            </NavbarDropdown.Item>
            <NavbarDropdown.Item
              className="navbar-dropdown-menu-item"
              onClick={() => navigate("/about_us")}
            >
              About Us
            </NavbarDropdown.Item>
          </NavbarDropdown.CSSTransitionMenu>
        </NavbarDropdown>
        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={profile_icon}
              alt="Profile Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          {isLoggedIn ? (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={10}
            >
              <NavbarDropdown.Item className="navbar-dropdown-menu-item">
                Log Out
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          ) : (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={200}
            >
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/login")}
              >
                Log In
              </NavbarDropdown.Item>
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          )}
        </NavbarDropdown>
      </div>
    </div>
  );
}
