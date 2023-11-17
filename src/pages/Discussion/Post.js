// Post.js
import React, { useState } from "react";
import "./Post.css";

const Post = ({ post, user, onLike, onComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          className="post-profile-picture"
          src={user.profilePicture}
          alt="Profile"
        />
        <div className="post-username">{user.username}</div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button className="like-button" onClick={() => onLike(post.id)}>
          Like ({post.likes})
        </button>
      </div>
      <div className="post-comments">
        {post.comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
      <div className="post-actions">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleCommentChange}
        />
        <button className="comment-submit" onClick={handleCommentSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
