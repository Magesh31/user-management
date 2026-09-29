
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/users"
      );

      if (!response.ok) {
        throw new Error("Unable to load users");
      }

      const data = await response.json();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Cannot connect to Flask API. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setAdding(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add user");
      }

      setUsers((prev) => [...prev, data]);
      setName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <span>U</span>
          </div>
          <span>UserHub</span>
        </div>

        <div className="api-status">
          <span className="status-dot"></span>
          Flask API
        </div>
      </header>

      <main className="container">
        <section className="welcome">
          <span className="eyebrow">USER DASHBOARD</span>
          <h1>Manage your users</h1>
          <p>
            A simple dashboard to add and manage users
            with your React and Flask application.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple">♙</div>
            <div>
              <p>Total users</p>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Backend status</p>
              <h2 className="status-text">
                {loading ? "Checking..." : error ? "Offline" : "Connected"}
              </h2>
            </div>
          </div>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Add new user</h2>
              <p>Enter a name to create a user.</p>
            </div>
          </div>

          <form className="user-form" onSubmit={addUser}>
            <div className="input-wrapper">
              <span className="input-icon">♙</span>
              <input
                type="text"
                placeholder="Enter user's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            <button type="submit" disabled={adding || !name.trim()}>
              {adding ? "Adding..." : "+ Add User"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Users list</h2>
              <p>All users retrieved from your backend.</p>
            </div>
            <span className="user-count">{users.length} users</span>
          </div>

          {loading ? (
            <div className="empty-state">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">♙</div>
              <h3>No users yet</h3>
              <p>Add your first user using the form above.</p>
            </div>
          ) : (
            <div className="users-list">
              {users.map((user, index) => (
                <div className="user-item" key={`${user.id}-${index}`}>
                  <div className={`avatar avatar-${index % 5}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>User #{user.id}</p>
                  </div>

                  <span className="active-badge">
                    <span></span> Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="footer">
          Built with <span>React</span> + <span>Flask</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
