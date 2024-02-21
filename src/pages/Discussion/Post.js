import React, { useState } from "react";
import "./Discussion.css";
import EditPostModal from "./EditModal"; // Import the EditPostModal component
import ThumbsUp from "../../images/ThumbsUp.png"

const Post = ({ post, user, onLike, onComment, onEdit, onDelete }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments.map((comment, index) => ({ id: index + 1, content: comment })));
  const [editedComment, setEditedComment] = useState({ id: null, content: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [likes, setLikes] = useState(post.likes);

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
    const newLikes = likes + 1;
    setLikes(newLikes);
    // Call the parent component function to handle like action
    onLike(post.id);
  };

  const handleEditPost = (postId, newContent) => {
    onEdit(postId, newContent);
    setShowEditModal(false); // Close the edit modal after saving changes
  };

  const handleEditComment = (commentId, newContent) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    ));
    setEditedComment({ id: null, content: "" }); // Clear edited comment state
    setShowEditModal(false); // Close the edit modal after saving changes
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleOpenEditModal = (commentId, content) => {
    setEditedComment({ id: commentId, content });
    setShowEditModal(true);
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
        <button className="like-button" onClick={handleLike} style={{ border: 'none', background: 'none' }}>
          <img src={ThumbsUp} alt="Like" style={{ width: '30px', height: '30px' }} />
        </button>
        <span>({likes})</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>

      </div>
      <div className="post-comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div>{comment.content}</div>
            <div className="comment-actions">
              <button onClick={() => handleOpenEditModal(comment.id, comment.content)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
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
          onCommentSave={handleEditComment} // Pass the function to edit comments
          onRequestClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Post;
