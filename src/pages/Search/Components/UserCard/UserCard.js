import React from "react";
import pfp from "../../../../images/dp.jpg";
import "./UserCard.css";

export default function UserCard(props) {
  return (
    <div className="userCardContainer">
      <img className="userCardIMG" src={pfp} alt="Bryan Martinez PFP" />
      Byran Martinez
    </div>
  );
}
