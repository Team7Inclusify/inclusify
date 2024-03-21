import React from "react";
import "./FilterSearch.css";

export default function FilterSearch({ onFilterSearchChange }) {
  return (
    <div className="filterSearchBar">
      <div
        className="filterSearchChoice"
        onClick={() => onFilterSearchChange("user")}
      >
        Users
      </div>
      <div
        className="filterSearchChoice"
        onClick={() => onFilterSearchChange("video-resume")}
      >
        Video-Resumes
      </div>
      <div
        className="filterSearchChoice"
        onClick={() => onFilterSearchChange("action-videos")}
      >
        Action Videos
      </div>
    </div>
  );
}
