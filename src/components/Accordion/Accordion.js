import React, { useState } from "react";
import "./Accordion.css";

export default function Accordion(props) {
  const toggleAccordion = () => {
    if (props.toggleAccordion) {
      props.toggleAccordion();
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-title" onClick={toggleAccordion}>
        {props.isOpen
          ? `Click to Close ${props.title}`
          : `Click to Open ${props.title}`}
      </div>
      {props.isOpen && (
        <div className="accordion-content"> {props.content} </div>
      )}
    </div>
  );
}
