import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Loginform";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const flash = (aMessage) => {
    setMessage(aMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({ title, author, url });
      console.log(response);
      let newBlog = { title: title, author: author, url: url, id: response.id };
      setBlogs((blogs) => [...blogs, newBlog]);
      let message = `${response.title} by ${response.author} created!`;
      flash(message);
    } catch (exception) {
      flash("error creating blog");
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.clear();
    setUser(null);
  };

  const Notification = ({ message }) => {
    return (
      <div>
        <h3>{message}</h3>
      </div>
    );
  };

  const newBlogForm = () => (
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

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification message={message} />
      {!user && <LoginForm flash={flash} setUser={setUser} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {user && newBlogForm()}
    </div>
  );
};

export default App;
