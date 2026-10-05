function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        No posts found. Create a user and then create a post.
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <article className="post-card" key={post._id}>
          <div className="post-top">
            <span className="post-badge">POST</span>
            <span className="post-id">{post._id}</span>
          </div>

          <h3>{post.title}</h3>
          <p className="post-content">{post.content}</p>

          <div className="author">
            <div className="avatar">
              {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <strong>{post.user?.name || "Unknown User"}</strong>
              <span>{post.user?.email || "No email"}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;
