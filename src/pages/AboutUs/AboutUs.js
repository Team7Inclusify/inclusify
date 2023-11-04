import React from "react";
import "./AboutUs.css";
import inlcusify_logo from "../../images/inclusify_with_name.png";

export default function AboutUs() {
  return (
    <div className="about-us-page">
      <img
        className="au-inclusify-logo"
        src={inlcusify_logo}
        alt={"Inclusify"}
      />
    </div>
  );
}
