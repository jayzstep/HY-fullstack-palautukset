import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Loginform";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

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
      {user && <NewBlogForm flash={flash} setBlogs={setBlogs} />}
    </div>
  );
};

export default App;
