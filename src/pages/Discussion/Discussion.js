// Discussion.js
import React, { useState } from "react";
import Post from "./Post";
import "./Discussion.css"; 
import dp from "../../images/dp.jpg";

const Discussion = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "This is the first post!",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      content: "Another post with some content.",
      likes: 0,
      comments: [],
    },
    {
      id: 3,
      content: "A third post for more discussions.",
      likes: 0,
      comments: [],
    },
    {
      id: 4,
      content: "A fourth post for more discussions.",
      likes: 0,
      comments: [],
    },
    // Add more posts as needed
  ]);

  const user = {
    profilePicture: dp,
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
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
    <div className="post-container">
      {posts.map((post) => (
        <Post key={post.id} post={post} user={user} onLike={handleLike} onComment={handleComment} />
      ))}
    </div>
  );
};

export default Discussion
;
