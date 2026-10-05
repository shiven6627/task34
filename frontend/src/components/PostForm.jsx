import { useState } from "react";

function PostForm({ users, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://task34-7ao5.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          userId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      onPostCreated(data);
      setTitle("");
      setContent("");
      setUserId("");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-header">
        <span className="number">02</span>
        <div>
          <h2>Create Post</h2>
          <p>Link a post to an existing user.</p>
        </div>
      </div>

      <label>
        User
        <select
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} — {user.email}
            </option>
          ))}
        </select>
      </label>

      {users.length === 0 && (
        <p className="hint">
          Create a user first. The new user will appear in this dropdown.
        </p>
      )}

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter post title"
          required
        />
      </label>

      <label>
        Content
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post content..."
          rows="5"
          required
        />
      </label>

      <button
        className="primary-btn"
        type="submit"
        disabled={submitting || users.length === 0}
      >
        {submitting ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}

export default PostForm;
