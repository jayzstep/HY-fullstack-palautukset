import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Loginform";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef()

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
    setAlertMessage(aMessage);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
  };

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

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
      <Notification message={alertMessage} />
      {!user && <LoginForm flash={flash} setUser={setUser} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm flash={flash} setBlogs={setBlogs} toggleVisibility={toggleVisibility} />
          </Togglable>

          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;