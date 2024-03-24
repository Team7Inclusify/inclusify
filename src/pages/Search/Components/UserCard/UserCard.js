import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserCard.css";
import default_pfp from "../../../../images/default_pfp.png";

export default function UserCard(props) {
  const navigate = useNavigate();
  return (
    <div
      className="userCardContainer"
      onClick={() => navigate(`/message/${props.userID}`)}
    >
      <img
        className="userCardIMG"
        src={props.pfpLink === "" ? default_pfp : props.pfpLink}
        alt="User Card PFP"
      />
      {props.name}
    </div>
  );
}
