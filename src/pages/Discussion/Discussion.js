import React, { useState } from "react";
import Post from "./Post";
import EditModal from "./EditModal";
import "./Discussion.css";
import dp from "../../images/dp.jpg";
import sendSvg from "../../images/send.svg";

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  const user = {
    profilePicture: dp,
    username: "user",
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

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
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
      <div className="posts-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onComment={handleComment}
            onLike={handleLike}
            onOpenEditModal={openEditModal}
          />
        ))}
      </div>
      <div className="create-post-container">
        <h2>What's on your mind?</h2>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your new post..."
        />
        <button onClick={handleCreatePost} className="post-button">
          <img src={sendSvg} alt="Icon" className="icon" />
        </button>
      </div>
      {showEditModal && (
        <EditModal
          post={posts.find((post) => post.id === editedPost)}
          onSave={handleEditPost}
          onRequestClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default Discussion;
