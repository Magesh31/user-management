
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
      setName("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>React + Flask API</h1>

      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users List</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;
