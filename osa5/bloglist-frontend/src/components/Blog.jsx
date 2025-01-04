import { useState } from "react";

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 200,
  };
  const showDetails = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateLikes = (event) => {
    event.preventDefault();
    handleLike(blog);
  };

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm("Do you really want to remove ", blog.title)) {
      handleRemove(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <b>{blog.title}</b>
      <p>{blog.author}</p>
      <div style={showDetails}>
        <p>likes: {blog.likes}</p>
        <button onClick={updateLikes}>like</button>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name && <button onClick={removeBlog}>delete blog</button>}
      </div>
      <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
    </div>
  );
};

export default Blog;
