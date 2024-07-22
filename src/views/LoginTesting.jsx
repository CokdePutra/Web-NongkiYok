import React, { useState } from "react";
import axios from "axios";

const LoginTesting = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const jwtDecode = (await import("jwt-decode")).default;
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setContent("");
  };

  const fetchContent = async (endpoint) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h1>Welcome, {user.role}</h1>
          <button onClick={() => fetchContent("user")}>Get User Content</button>
          {user.role === "admin" && (
            <button onClick={() => fetchContent("admin")}>
              Get Admin Content
            </button>
          )}
          <button onClick={handleLogout}>Logout</button>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default LoginTesting;
