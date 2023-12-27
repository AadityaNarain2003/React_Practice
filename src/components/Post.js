import React from "react";

function Post({ post }) {
    return (
      <div className="post-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Author: {post.author}</p>
        <p>Timestamp: {post.timestamp}</p>
      </div>
    );
  }

export default Post;