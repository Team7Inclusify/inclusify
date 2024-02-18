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
        style={{ width: '100%', height: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#3498db', color: '#fff' }}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'blue', color: '#fff' }}
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
