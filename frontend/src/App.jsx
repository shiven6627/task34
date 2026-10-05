import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://task34-7ao5.onrender.com/api/posts");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      setPosts(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
   
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const handleUserCreated = (user) => {
    setUsers((currentUsers) => [user, ...currentUsers]);
  };

  const handlePostCreated = (post) => {
    setPosts((currentPosts) => [post, ...currentPosts]);
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN STACK TASK</p>
          <h1>User & Post Reference</h1>
          <p className="subtitle">
            Mongoose schema reference with React forms and populated user data.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="forms-grid">
          <UserForm onUserCreated={handleUserCreated} />
          <PostForm users={users} onPostCreated={handlePostCreated} />
        </section>

        <section className="posts-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DATABASE RESULTS</p>
              <h2>All Posts</h2>
            </div>
            <button className="refresh-btn" onClick={fetchPosts}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="empty-state">Loading posts...</div>
          ) : (
            <PostList posts={posts} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
