import React, { useState } from "react";
import "./Discussion.css";
import EditPostModal from "./EditModal"; // Import the EditPostModal component
import ThumbsUp from "../../images/ThumbsUp.png";

const Post = ({ post, user, onLike, onComment, onEdit, onDelete }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(
    post.comments.map((comment, index) => ({
      id: index + 1,
      content: comment,
    }))
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false); // New state variable to track like status

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      const newComment = { id: comments.length + 1, content: commentText };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  const handleEdit = () => {
    setShowEditModal(true); // Open the edit modal
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleLike = () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLiked(!liked);
    // Call the parent component function to handle like action
    onLike(post.id);
  };

  const handleEditPost = (postId, newContent) => {
    onEdit(postId, newContent);
    setShowEditModal(false); // Close the edit modal after saving changes
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
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
        <button
          className="like-button"
          onClick={handleLike}
          style={{ border: "none", background: "none", marginRight: '20px' }}
        >
          <img
            src={ThumbsUp}
            alt="Like"
            style={{ width: "30px", height: "30px" }}
          />
        </button>
        <span>({likes})</span>
        <div style={{ flex: "1" }}></div> {/* Create space between buttons */}
        <button onClick={handleEdit} style={{ marginRight: '20px' }}>Edit</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', marginRight: '100px' }}>Delete</button>
      </div>
      <div className="post-comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div>{comment.content}</div>
            <div className="comment-actions">
              <button
                className="delete-comment"
                onClick={() => handleDeleteComment(comment.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
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
      {/* Render the EditPostModal component if showEditModal is true */}
      {showEditModal && (
        <EditPostModal
          post={post}
          onSave={handleEditPost}
          onRequestClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Post;
