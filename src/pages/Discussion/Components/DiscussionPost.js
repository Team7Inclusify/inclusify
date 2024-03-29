import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiscussionPost.css";

const DiscussionPost = (props) => {
  const navigate = useNavigate();

  const goToUser = (event) => {
    event.stopPropagation();
    navigate(`/user/${props.uploader}`);
  };
  return (
    <div
      className="discussion-post-container"
      onClick={() => navigate(`/discussion/${props.postID}`)}
    >
      <div className="post-discussion">{props.discussion}</div>
      <div className="otherInfoBar">
        <div className="discussion-post-uploader" onClick={goToUser}>
          {props.uploader}
        </div>
        <div className="discussionPostButtons">
          <button>Like</button>
          <button>Respond</button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPost;
