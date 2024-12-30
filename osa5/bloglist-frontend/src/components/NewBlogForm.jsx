import blogService from "../services/blogs";

import { useState } from "react";

const NewBlogForm = ({ flash, setBlogs, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({ title, author, url });
      toggleVisibility()
      let newBlog = { title: title, author: author, url: url, id: response.id };
      setBlogs((blogs) => [...blogs, newBlog]);
      setTitle("")
      setAuthor("")
      setUrl("")
      let message = `${response.title} by ${response.author} created!`;
      flash(message);
    } catch (exception) {
      flash("error creating blog");
    }
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
