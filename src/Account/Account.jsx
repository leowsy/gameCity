import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ loginStatus, setLoginStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername === username && storedPassword === password) {
      setLoginStatus(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  if (loginStatus) {
    return (
      <div className="welcome-message">
        <h2>Welcome, {localStorage.getItem("username")}!</h2>
        <Link to="/All" className="button">
          Continue Shopping
        </Link>
        <button className="logout" onClick={() => setLoginStatus(false)}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <Link to="/CreateAccount">
            <button type="button">Create Account</button>
          </Link>
        </form>
      </div>
    );
  }
};

export default Login;
