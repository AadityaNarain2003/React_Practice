import React from "react";
import '../styles/posts.css';
import Post from "./Post";

function PostBox(props) {
  console.log("here postbox");
  console.log(props.posts);

  return (
    <div className="post-box">
      {props.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostBox;
