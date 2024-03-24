import React from "react";
import "./FilterSearch.css";

export default function FilterSearch({ selected, onFilterSearchChange }) {
  return (
    <div className="filterSearchBar">
      <div
        className={`filterSearchChoice ${
          selected === "user" && "filterSearchSelected"
        }`}
        onClick={() => onFilterSearchChange("user")}
      >
        Users
      </div>
      <div
        className={`filterSearchChoice ${
          selected === "video-resume" && "filterSearchSelected"
        }`}
        onClick={() => onFilterSearchChange("video-resume")}
      >
        Video-Resumes
      </div>
      <div
        className={`filterSearchChoice ${
          selected === "additional-video" && "filterSearchSelected"
        }`}
        onClick={() => onFilterSearchChange("additional-video")}
      >
        Additional Videos
      </div>
    </div>
  );
}
