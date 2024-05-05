import React from "react";
import "./ProgressCircle.css";

export default function ProgressCircle({ percent }) {
  return (
    <div className="progressCircleBG">
      <div class="progressCircle"></div>
      <div className="percentText">{percent}%</div>
      <div className="uploadText">Uploading, Do Not close this tab</div>
    </div>
  );
}
