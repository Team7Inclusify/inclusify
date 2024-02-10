import React from "react";
import "./Resources.css";
import { mockResources } from "./mockData";

const ResourceCategory = ({ title, resources }) => {
  const renderResources = (resources) => {
    return resources.map((resource, index) => (
      <p key={index}>
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          {resource.name}
        </a>
      </p>
    ));
  };

  return (
    <div className="category-container">
      <h2>{title}</h2>
      <div className="resource-section">{renderResources(resources)}</div>
    </div>
  );
};

export default function Resource() {
  const { resumeBuilding, jobSearch, youtubeLinks, events } = mockResources;

  return (
    <div className="resource-page">
      <ResourceCategory title="Resume Building Resources" resources={resumeBuilding} />
      <ResourceCategory title="Job Search Resources" resources={jobSearch} />
      <ResourceCategory title="YouTube Links" resources={youtubeLinks} />
      <ResourceCategory title="Events" resources={events} />
      
    </div>
  );
}