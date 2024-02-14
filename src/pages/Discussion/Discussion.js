// Discussion.js
import React, { useState } from "react";
import Post from "./Post";
import EditPostModal from "./EditModal"; // Import the EditPostModal component
import "./Discussion.css";
import dp from "../../images/dp.jpg";

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  const user = {
    profilePicture: dp,
  };

  const handleCreatePost = () => {
    if (newPostContent.trim() !== "") {
      const newPost = {
        id: posts.length + 1,
        content: newPostContent,
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  const handleEditPost = (postId, newContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
    setShowEditModal(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const openEditModal = (postId, content) => {
    setEditedPost(postId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedPost(null);
  };

  const handleComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, commentText] }
          : post
      )
    );
  };

  return (
    <div className="discussion-container">
      <div className="post-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onComment={handleComment} // Pass the onComment function
            onOpenEditModal={openEditModal}
          />
        ))}
      </div>
      <div className="create-post-container">
        <h2>Create Post</h2>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your new post..."
        />
        <button onClick={handleCreatePost} style={{ backgroundColor: '#001F3F', color: 'white' }}>Create Post</button>
      </div>
      {showEditModal && (
        <EditPostModal
          post={posts.find((post) => post.id === editedPost)}
          onSave={handleEditPost}
          onRequestClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default Discussion;
