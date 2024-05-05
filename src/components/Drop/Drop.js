import React, { useState } from "react";
import "./dropdown.css";

export default function Dropdown(props) {
  const [isDropdownOpen, setDropdown] = useState(false);

  const isHovering = () => {
    setDropdown(true);
  };
  const notHovering = () => {
    setDropdown(false);
  };

  return (
    <div
      className="dropdown-container"
      onMouseEnter={isHovering}
      onMouseLeave={notHovering}
    >
      {props.coverIsImg ? (
        <img
          className={
            props.isCircular ? "dropCoverImg" : "dropCoverImgNotCircular"
          }
          src={props.coverImg}
          alt="Dropdown"
        />
      ) : (
        <>Profile</>
      )}
      {isDropdownOpen && (
        <div className="dropdown-content">{props.content}</div>
      )}
    </div>
  );
}
