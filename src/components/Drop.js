import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import navdrop from "../images/navbar_dropdown.png";
import { useNavigate } from "react-router-dom";

export default function Dropdown(props) {
  const [isNavbarDropdownOpen, setNavbarDropdown] = useState(false);
  const navigate = useNavigate();

  const isHovering = () => {
    setNavbarDropdown(true);
  };
  const notHovering = () => {
    setNavbarDropdown(false);
  };

  const closeDrop = () => {
    // Close the dropdown after clicking a link if needed
    setNavbarDropdown(false);
  };

  return (
    <div
      className="navbar-dropdown-container"
      onMouseEnter={isHovering}
      onMouseLeave={notHovering}
    >
      {props.coverIsImg ? (
        <img className="dropCoverImg" src={props.coverImg} alt="Dropdown" />
      ) : (
        <>Profile</>
      )}
      {isNavbarDropdownOpen && (
        <div className="dropdown-content">{props.content}</div>
      )}
    </div>
  );
}
