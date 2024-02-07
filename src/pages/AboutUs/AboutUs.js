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
      <div className="about-us-description">
        <h2>Who We Are</h2>
        <p className="description-text">
          Inclusify's aim is to focused on empowering autistic individuals and other disabled job seekers. Our platform provides a supportive environment where users can connect, share experiences, access various resources, and build their non-traditional video resumes with accessible features.
        </p>
        <p className="description-text">
          By fostering a sense of belonging and inclusivity within the autism community and beyond, Inclusify aims to break down barriers to employment and create opportunities for individuals with disabilities to thrive in the workforce.
        </p>
      </div>
    </div>
  );
}
