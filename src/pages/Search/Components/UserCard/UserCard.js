import React from "react";
import "./UserCard.css";
import default_pfp from "../../../../images/default_pfp.png";

export default function UserCard(props) {
  return (
    <div className="userCardContainer">
      <img
        className="userCardIMG"
        src={props.pfpLink === "N/A" ? default_pfp : props.pfpLink}
        alt="User Card PFP"
      />
      {props.name}
    </div>
  );
}
