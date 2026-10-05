import { useState } from "react";

function UserForm({ onUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      onUserCreated(data);
      setName("");
      setEmail("");
      alert("User created successfully. Copy the user ID if needed.");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-header">
        <span className="number">01</span>
        <div>
          <h2>Create User</h2>
          <p>Add a user to MongoDB.</p>
        </div>
      </div>

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter user name"
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
          required
        />
      </label>

      <button className="primary-btn" type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}

export default UserForm;
