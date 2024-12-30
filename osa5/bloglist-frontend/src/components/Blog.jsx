import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 200
  };
  const showDetails = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle}>
      <b>{blog.title}</b>
      <p>{blog.author}</p>
      <div style={showDetails}>
        <p>likes: {blog.likes}</p>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
      </div>
      <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
    </div>
  );
};

export default Blog;
