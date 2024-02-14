// EditModal.js
import React, { useState } from "react";

const EditModal = ({ post, onSave, onRequestClose }) => {
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    onSave(post.id, editedContent); // Pass postId and editedContent to onSave
  };

  return (
    <div className="edit-modal">
      <h2>Edit Post</h2>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        placeholder="Edit your post..."
      />
      <div className="edit-modal-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
