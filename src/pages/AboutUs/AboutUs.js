import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import Myesha_image from "../../images/Myesha.jpg";
import Bryan_image from "../../images/Bryan.jpg";
import Najia_image from "../../images/Najia.jpg";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set isVisible to true after a delay to trigger the animation
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust delay as needed

    // Clear the timeout on unmount to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="about-us-page">
      <div className="header">
        <h1 className="heading">Who We Are</h1>
      </div>
      <div className={`content ${isVisible ? "pop-up" : ""}`}>
        <p className="description">
          Inclusify is dedicated to empowering autistic individuals and other
          disabled job seekers. Our platform fosters a supportive environment
          where users can connect, share experiences, access resources, and
          build non-traditional video resumes with accessible features.
        </p>
      </div>
      <div className="team-section">
        <div className={`team-member ${isVisible ? "pop-up" : ""}`}>
          <img src={Myesha_image} alt="Myesha" className="team-member-image" />
          <h3 className="member-name">Myesha Mahazabeen</h3>
          <p className="member-role">Software Engineer</p>
        </div>
        <div className={`team-member ${isVisible ? "pop-up" : ""}`}>
          <img src={Bryan_image} alt="Bryan" className="team-member-image" />
          <h3 className="member-name">Bryan Martinez</h3>
          <p className="member-role">Software Engineer</p>
        </div>
        <div className={`team-member ${isVisible ? "pop-up" : ""}`}>
          <img src={Najia_image} alt="Najia" className="team-member-image" />
          <h3 className="member-name">Najia Jahan</h3>
          <p className="member-role">Software Engineer</p>
        </div>
      </div>
    </div>
  );
}
